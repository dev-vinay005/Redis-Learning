import mongoose from "mongoose";
import { config } from "dotenv"
config()
export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("DB connected");

    } catch (err) {
        console.log(err);

    }
}