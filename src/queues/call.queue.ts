import { Queue } from "bullmq";
import { Redis } from "ioredis";
import dotenv from "dotenv";

// 1. Force load the .env file exactly right here, right now
dotenv.config();

const redisUri = process.env.REDIS_URI;

// 2. Add a safety check! 
if (!redisUri) {
  throw new Error("🚨 REDIS_URI is completely missing! Check your .env file.");
}

console.log("Attempting to connect to:", redisUri.substring(0, 20) + "...");

// 3. Connect to Redis (BullMQ also requires maxRetriesPerRequest to be null)
const redisConnection = new Redis(redisUri, {
  maxRetriesPerRequest: null,
});

redisConnection.on("connect", () => {
  console.log("✅ Successfully connected to Upstash Redis!");
});

redisConnection.on("error", (err) => {
  console.error("❌ Redis connection error:", err.message);
});

export const callQueue = new Queue("call-queue", {
  connection: redisConnection as any,
});