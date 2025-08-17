# Meeting Summarizer Frontend

This is the **frontend** for the AI-powered Meeting Notes Summarizer & Email Sharing application.\
It is built with **Vite + React + Tailwind CSS**.

---

## Features

- Upload a transcript file (`.txt` or `.doc`) **or** paste transcript text.
- Enter a custom instruction/prompt for summarization.
- Generate an AI-powered summary.
- Edit the generated summary.
- Share the summary via email to **single or multiple recipients**.

---

## Requirements

- Node.js v18+
- Backend server running (Meeting Summarizer Backend)
- Environment variables for backend API endpoint (if needed)

---

## Installation

1. Clone the repository:

```bash
git clone <frontend-repo-url>
cd <frontend-folder>
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open the app in your browser:

```
http://localhost:5173
```

---

## Usage

1. Upload a transcript file **or** paste the transcript text.
2. Enter a prompt for the summarization (e.g., "Summarize in bullet points").
3. Click **Generate Summary** to get the AI summary.
4. Edit the summary if needed.
5. Enter recipient email(s) (comma-separated) and subject, then click **Send Emails**.

---

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js + Express (for API)
- **AI Service:** Groq (summarization)
- **Email Queue:** BullMQ + Redis (for sending emails)

---

## Notes

- Ensure the backend server is running before using the frontend.
- The email sharing form supports **multiple recipients** separated by commas.

---

## Author

**Ravi Mani**


