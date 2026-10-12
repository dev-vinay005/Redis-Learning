import express from "express";
import { config } from "dotenv";
import { connectDb } from "./config/db.js";
import { userModel } from "./models/userModel.js";
import Redis from "ioredis";
import { rateLimitter } from "./middleare/ratelimit.js";
import { sendEmail } from "./lib/sendEmail.js";
import emailQueue from "./bullmq/queue.js";
config();

const PORT = process.env.PORT || 3000;
const app = express();

export const redis = new Redis(process.env.REDIS_URL)
app.use(express.json());

app.post("/createuser", async (req, res) => {
  const { name, email, password } = req.body;
  const existingEmail = await userModel.findOne({ email })
  if (existingEmail) {
    return res.json({ message: "Email already registered" })
  }
  const user = await userModel.create({
    name,
    email,
    password,
  });
  const deleted = await redis.del("users:all") // delete the cache when new user is created
  await emailQueue.add("sendEmail", { email: user.email })

  res.status(200).json({
    message: "User created Sucessfully",
    user,
  });
});

app.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email })
  if (!user) {
    return res.status(404).json({ message: "User not found" })
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString()

  const setOtp = await redis.set(`otp:${email}`, otp, "EX", 30)
  console.log("setting otp in redis", setOtp);

  res.json({
    message: "OTP sent sucessfully ",
    otp
  })
})

app.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body

  const cachedOtp = await redis.get(`otp:${email}`)
  if (!cachedOtp) {
    res.status(400).json({
      message: "OTP has been expired"
    })
  }

  console.log("logging OTP from the redis", cachedOtp)

  if (cachedOtp != otp) {
    res.status(400).json({
      message: "Incorrect OTP"
    })
  }

  return res.json({
    message: "OTP verified",
    otp
  })
})

app.get("/getuser", rateLimitter, async (req, res) => {
  const user = await userModel.find()
  res.status(200).json(user)
})

app.get("/getuser-with-redis", async (req, res) => {

  const cashed = await redis.get("users:all")
  console.log("logging redis response", cashed);
  if (cashed) {
    const user = JSON.parse(cashed)
    return res.status(200).json(user)
  }

  const user = await userModel.find()
  await redis.set("users:all", JSON.stringify(user))
  res.status(200).json(user)
})

app.delete("/deleteallusers", async (req, res) => {
  const deletedUsers = await userModel.deleteMany()
  await redis.del("users:all")
  res.status(200).json({ message: "All users deleted", deletedUsers })
})

app.listen(PORT, async () => {
  await connectDb();
  console.log(`Server is running on port ${PORT}`);
});




// without Redis it takes Time about : 121 ms