# Meeting Notes Summarizer Backend

This is the **backend** for the AI-powered Meeting Notes Summarizer & Email Sharing application. It is built using **Node.js + Express** and integrates **Groq AI** for summarization and **BullMQ + Redis** for email queuing.

---

## Features

- Accepts **transcript file** (`.txt` or `.doc`) or pasted text.
- Accepts a **custom instruction/prompt** for summarization.
- Generates AI-powered summary using **Groq API**.
- Shares the summary via **email** to single or multiple recipients.
- Queue system for handling **email sending** using **BullMQ**.

---

## Tech Stack

- **Backend:** Node.js, Express
- **AI Service:** Groq SDK
- **Email Sending:** Nodemailer
- **Queue System:** BullMQ
- **Queue Storage:** Redis 
- **File Parsing:** `mammoth` for `.docx` files, built-in buffer handling for `.txt` files

---

## Requirements

- Node.js v18+
- Redis instance 
- Environment variables configured

---

## Environment Variables

Create a `.env` file at the root of the project:

```
PORT=5000
GROQ_API_KEY=<your_groq_api_key>
EMAIL_USER=<your_email_address>
EMAIL_PASS=<your_email_password>
EMAIL_QUEUE_NAME=email-queue
REDIS_URL=<your_redis_url>
EMAIL_HOST=<gmail/or_any_other_provider>
EMAIL_PORT=<your_email_port>
```

- `PORT` – port for backend server
- `GROQ_API_KEY` – API key for Groq AI service
- `EMAIL_USER` , `EMAIL_PASS` , `EMAIL_HOST` & `EMAIL_PORT` – email credentials for Nodemailer
- `EMAIL_QUEUE_NAME` – name of BullMQ queue
- `REDIS_URL` – Redis connection URL (Upstash or any other provider)

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/ravimani1001/Meeting-notes-summarizer.git
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Run the server locally:

```bash
npm run start
```

Server will start on `http://localhost:5000` (or `process.env.PORT`).

---

## Project Structure

```
└── backend
    ├── .env.sample
    ├── .gitignore
    ├── README.md
    ├── app.js
    ├── controllers
        ├── shareController.js
        └── summarizeController.js
    ├── middleware
        └── upload.js
    ├── package-lock.json
    ├── package.json
    ├── queues
        ├── emailQueue.js
        └── redisConnection.js
    ├── routes
        ├── shareRoutes.js
        └── summarize.js
    ├── server.js
    ├── services
        └── emailService.js
    ├── tests
        ├── email.test.js
        └── summarize.test.js
    ├── utils
        └── parseFile.js
    ├── worker.js
    └── workers
        └── emailWorker.js
```

---

## Usage

1. **Summarization**:

   - Endpoint: `POST /api/summarize`
   - Payload: multipart form data
     - `file` (optional) – transcript file (`.txt` or `.docx`)
     - `transcriptText` (optional) – transcript text
     - `instruction` – summarization prompt
   - Response: AI-generated summary text

2. **Sharing via Email**:

   - Endpoint: `POST /api/share`
   - Payload (JSON):

```json
{
  "to": ["recipient1@example.com", "recipient2@example.com"],
  "subject": "Meeting Summary",
  "text": "<AI generated summary text>"
}
```

- Each email is enqueued as a job in **BullMQ**.
- **emailWorker.js** processes the jobs and sends emails via **Nodemailer**.

---

## Queue System

- **BullMQ** is used to manage background email sending.
- **Redis** stores the queue and job data.
- Each job contains:
  - `to` – recipient email
  - `subject` – email subject
  - `text` – email content
- The worker processes jobs concurrently with retries and failure handling.

---

## File Parsing

- `.txt` files: read from buffer, converted to string.
- `.docx` files: parsed using `mammoth` library.
- Combined with any pasted transcript text before sending to Groq API.


---

## Deployment

- Deploy backend server to **Render** as a web service.
- Deploy **emailWorker** as a background worker on the same platform (must run continuously).
- Ensure **environment variables** are set on the deployment platform.

---

## Notes

- Ensure **Redis URL** is accessible by both backend and worker.
- For development, CORS is configured to allow frontend access.
- System prompt for Groq summarization is set in the controller to handle general summarization tasks.

---

## Author

**Ravi Mani**

