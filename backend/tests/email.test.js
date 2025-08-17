// tests/email.test.js
import request from "supertest";
import express from "express";
import emailRoute from "../routes/shareRoutes.js";

const app = express();
app.use(express.json());
app.use("/share", emailRoute);

describe("POST /share", () => {
  it("should enqueue email jobs", async () => {
    const res = await request(app)
      .post("/share")
      .send({
        to: ["ravimani1707@gmail.com", "girishwarmani@gmail.com"],
        subject: "Test Email",
        text: "This is a test summary",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/Your email is being processed and will be sent shortly./i);
  });

  it("should return error if no recipients", async () => {
    const res = await request(app).post("/share").send({
      to: [],
      subject: "Test",
      text: "Test text",
    });

    expect(res.statusCode).toBe(400); // depending on your controller logic
  });
});
