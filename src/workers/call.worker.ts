import { Worker } from "bullmq";
import { Redis } from "ioredis";
import twilio from "twilio";
import Call from "../models/call.js";
import Event from "../models/event.js";

const redisConnection = new Redis(process.env.REDIS_URI || "redis://127.0.0.1:6379");
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const callWorker = new Worker("call-queue", async (job) => {
    const { meetupId, contactId, phone } = job.data;

    // Fetch dynamic event details for the speech
    const event = await Event.findById(meetupId);
    if (!event) throw new Error("Event not found");

    // Update DB status to Calling
    const callRecord = await Call.findOneAndUpdate(
        { meetupId, contactId },
        { status: "Calling", $inc: { attempts: 1 } },
        { new: true }
    );

    // Create the TwiML instructions for Twilio
    // Twilio will read this text, then wait for the user to press 1 or 2
    const twiml = new twilio.twiml.VoiceResponse();
    const gather = twiml.gather({
        numDigits: 1,
        action: `${process.env.APP_URL}/calls/webhook`, // Where Twilio sends the key press
        method: 'POST'
    });
    
    gather.say(`Hello! You are invited to ${event.title} at ${event.meetingPlace}. Press 1 to accept, or press 2 to decline.`);
    twiml.say("We didn't receive any input. Goodbye!"); // Fallback

    // Initiate the call
    await twilioClient.calls.create({
        twiml: twiml.toString(),
        to: phone,
        from: process.env.TWILIO_PHONE_NUMBER as any,
    });

  }, { connection: redisConnection as any}
);

callWorker.on("failed", async (job, err) => {
    console.error(`Job ${job?.id} failed:`, err);
    // You can update the Call model status to "Failed" or "Retry" here based on attempts
});