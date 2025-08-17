// controllers/shareController.js
import { emailQueue } from "../queues/emailQueue.js";

export const shareController = {
  // Controller function to handle share requests
  async shareByEmail(req, res) {
    try {
      const { to, subject, text } = req.body;

      // Basic validation
      if (!to || !subject || !text) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      if(to.length == 0)
      {
        return res.status(400).json({ error: "Atleast one recipient required" });
      }

      // Add job to the queue
      for(const recipient of to)
      {
        await emailQueue.add(
            "send-email", 
            {
                to : recipient,
                subject,
                text,
            },
            {
                attempts: 5,             // retry up to 5 times
                backoff: {
                type: "exponential",   // exponential backoff (could also use "fixed")
                delay: 5000,           // 5s between retries
                },
                removeOnComplete: true,  // clean up successful jobs
                removeOnFail: false,     // keep failed jobs for debugging
                timeout: 20000,          // kill job if it takes > 20s
            }
        );

      
      
      }
      // Respond immediately
      return res.status(200).json({
        message: "Your email is being processed and will be sent shortly.",
      });
    } catch (error) {
      console.error("Error in shareController:", error);
      return res.status(500).json({ error: "Something went wrong" });
    }
  },
};
