// workers/emailWorker.js
// import dotenv from 'dotenv'
// dotenv.config()
// loadEnv.js
import 'dotenv/config';

import { Worker } from "bullmq";
import  redisConnection  from "../queues/redisConnection.js";
import { sendEmail } from "../services/emailService.js";

// Create a worker for the "email-queue"
export const emailWorker = new Worker(
  process.env.EMAIL_QUEUE_NAME,
  async (job) => {
    console.log(`Processing job ${job.id} of type ${job.name}`);

    // job.data contains the email details we passed when adding job
    const { to, subject, text } = job.data;

    // Here we’ll add email sending logic
    // For now, just simulate with a console.log
    // console.log(`Sending email to: ${to}`);
    // console.log(`Subject: ${subject}`);
    // console.log(`Message: ${text}`);
    await sendEmail( { to , subject , text } )

    // TODO: Replace with real email sending (Nodemailer, etc.)
  },
  {
    connection: redisConnection,
    concurrency: 5, // process 5 jobs in parallel
    // default job options (applied to every job unless overridden)
    settings: {
      lockDuration: 30000, // 30s lock per job
    },
  }
);

emailWorker.on("failed", (job, err) => {
  console.error(`Job ${job.id} failed after retries:`, err.message);
});

emailWorker.on("completed", (job) => {
  console.log(`Job ${job.id} completed successfully ✅`);
});
