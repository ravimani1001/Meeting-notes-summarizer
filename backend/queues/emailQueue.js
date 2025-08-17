// src/queues/emailQueue.js
import pkg from 'bullmq';
const { Queue, QueueEvents } = pkg;
import redisConnection from "./redisConnection.js";

/**
 * Name of the queue. Using a constant makes it easy to reuse across worker / producer.
 */
const EMAIL_QUEUE_NAME = process.env.EMAIL_QUEUE_NAME || "emailQueue";
// console.log(EMAIL_QUEUE_NAME)
//  

/**
 * Create the Queue instance.
 * - This is what your app will use to add jobs (email tasks) into Redis.
 * - We pass the shared redisConnection so BullMQ uses the same Redis client.
 */
const emailQueue = new Queue(EMAIL_QUEUE_NAME, {
  connection: redisConnection,
});


/**
 * QueueEvents lets us listen to global events for the queue (completed, failed, etc.)
 * - Useful for logging, metrics, or real-time notifications.
 * - These events are emitted as jobs change state in Redis.
 */
const emailQueueEvents = new QueueEvents(EMAIL_QUEUE_NAME, {
  connection: redisConnection,
});

/**
 * Simple logging listeners (optional but very useful during development).
 * - 'completed' fires when a job finishes successfully.
 * - 'failed' fires when a job fails (after retries if configured).
 */
emailQueueEvents.on("completed", ({ jobId, returnvalue }) => {
  console.log(`[emailQueue] job ${jobId} completed.`);
});

emailQueueEvents.on("failed", ({ jobId, failedReason }) => {
  console.error(`[emailQueue] job ${jobId} failed: ${failedReason}`);
});

/**
 * Export the queue and events so other modules (controllers, workers) can use them.
 */
export { emailQueue, emailQueueEvents };
