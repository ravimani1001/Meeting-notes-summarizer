// import dotenv from 'dotenv'
// dotenv.config()

import express from "express";
const app = express();
import cors from 'cors'
import summarizeRoutes from "./routes/summarize.js";
import shareRoutes from "./routes/shareRoutes.js";


// Middleware
app.use(express.json());
const allowedOrigins = ['http://localhost:5173' , 'https://meeting-notes-summarizer-lake.vercel.app']
app.use(cors(
  // {
  //   origin: allowedOrigins,
  // }
))

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is healthy" });
});

app.use("/api/summarize", summarizeRoutes);
app.use("/api/share", shareRoutes);


// Export app
export default app;
