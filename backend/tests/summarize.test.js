// tests/summarize.test.js
import request from "supertest";
import express from "express";
import summarizeRoute from "../routes/summarize.js";

const app = express();
app.use(express.json());
app.use("/summarize", summarizeRoute);

describe("POST /summarize", () => {
  it("should return summary for text input", async () => {
    const res = await request(app)
      .post("/summarize")
      .field("transcriptText", "This is a test meeting transcript")
      .field("prompt", "Summarize in bullet points");

    expect(res.statusCode).toBe(200);
    expect(res.body.summary).toBeDefined();
    expect(res.body.summary.length).toBeGreaterThan(0);
  });

  it("should return error if no input is provided", async () => {
    const res = await request(app).post("/summarize");
    expect(res.statusCode).toBe(400); // depending on your controller logic
  });
});
