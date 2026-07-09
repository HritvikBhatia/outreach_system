import { Queue } from "bullmq";
import { Redis } from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const redisUri = process.env.REDIS_URI;

// 2. Add a safety check! 
if (!redisUri) {
  throw new Error("REDIS_URI is completely missing! Check your .env file.");
}

console.log("Attempting to connect to:", redisUri.substring(0, 20) + "...");

const redisConnection = new Redis(redisUri, {
  maxRetriesPerRequest: null,
});

redisConnection.on("connect", () => {
  console.log("Successfully connected to Upstash Redis!");
});

redisConnection.on("error", (err) => {
  console.error("Redis connection error:", err.message);
});

export const callQueue = new Queue("call-queue", {
  connection: redisConnection as any,
});

export async function addCallJobs(meetupId: string, contacts: any[]) {
  const jobs = contacts.map((contact) => ({
    name: "process-call",
    data: { meetupId, contactId: contact._id, phone: contact.phone },
    opts: {
      attempts: 2,
      backoff: { type: "exponential", delay: 5000 },
    },
  }));

  await callQueue.addBulk(jobs);
  console.log(`Added ${jobs.length} call jobs to the queue!`);
}