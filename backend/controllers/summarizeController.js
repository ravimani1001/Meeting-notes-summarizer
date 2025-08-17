// import dotenv from 'dotenv'
// dotenv.config()

import { parseFile } from "../utils/parseFile.js";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const summarizeController = async (req, res) => {
  try {
    const { transcriptText, prompt } = req.body;
    const file = req.file;

    // Validation
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    if (!transcriptText && !file) {
      return res.status(400).json({ error: "Either transcriptText or file is required" });
    }

    let finalTranscript = ''
    if (file) {
      // using buffer-based parsing
      finalTranscript = finalTranscript + await parseFile(file);
    } 
    if (transcriptText) {
      finalTranscript = finalTranscript + '\n\nAdditionalNotes' + transcriptText;
    }

    if(!finalTranscript.trim())
    {
        return res.status(400).json({ error: "Could not extract text from file" });
    }

    // Call Groq API for summarization
    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [
        { role: "system", content: `You are a professional summarizer. Read the provided text and create a clear, concise summary that captures the main ideas and key details. Avoid repetition and unnecessary examples. The summary should be easy to understand for a general audience.` },
        { role: "user", content: `Summarize everything in the text:\n\n${finalTranscript} Do the summarization to the point using the user prompt - ${prompt}` },
      ],
    });

    const summary = completion.choices[0].message.content;

    return res.status(200).json({ 
            received: {
            transcriptText,
            file: file ? file.originalname : null,
            text : finalTranscript,
            prompt,
        },
        summary
     });
    
  } catch (err) {
    console.error("Summarization Error : ",err);
    return res.status(500).json({ error: "Internal server error", message : err.message });
  }
};
