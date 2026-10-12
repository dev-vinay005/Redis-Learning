import { redis } from "../index.js"


export const rateLimitter = async (req, res, next) => {
    const ip = req.ip
    const key = `rate_limit:${ip}`
    // await redis.del(key)
    const request = await redis.incr(key)
    console.log("loggin number of requests", request);
    if (request === 1) {
        const expireKey = await redis.expire(key, 30)
        console.log("logging expireKey", expireKey);
    }
    if (request > 5) {
        return res.status(429).json({ message: "Too Many Requests" })
    }

    next()

}