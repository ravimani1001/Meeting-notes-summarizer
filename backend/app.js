// import dotenv from 'dotenv'
// dotenv.config()

import express from "express";
const app = express();
import cors from 'cors'
import summarizeRoutes from "./routes/summarize.js";
import shareRoutes from "./routes/shareRoutes.js";


// Middleware
app.use(express.json());
app.use(cors())

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is healthy" });
});

app.use("/api/summarize", summarizeRoutes);
app.use("/api/share", shareRoutes);


// Export app
export default app;
