
// import dotenv from 'dotenv'
// dotenv.config()
import IORedis from "ioredis";

const REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379";

const redisConnection = new IORedis(REDIS_URL , {maxRetriesPerRequest: null});

export default redisConnection;
