# Meeting Notes Summarizer

A smart, AI-powered tool to automatically summarize meeting notes, making it easier to review discussions, action items, and key decisions. Ideal for teams, professionals, and students who want concise and organized meeting summaries.

Live Demo : [Link](https://meeting-notes-summarizer-lake.vercel.app/)

## Features

- **Automatic Summarization**: Converts lengthy meeting notes into clear, concise summaries.
- **Action Items Extraction**: Highlights key tasks, decisions, and follow-ups.
- **Transcript File Support**: Accepts text and document upload.
- **Customizable Summary Length**: Short, medium, or detailed summaries.
- **Easy-to-Use Interface**: Simple input and output, no technical skills required.

## Tech Stack

- **Backend**: Node.js 
- **AI Interface**: Groq
- **Frontend**: React.js and Tailwind CSS
- **Deployment**: Vercel and Render

## Installation

1. **Clone the repository**:

```bash
git clone https://github.com/ravimani1001/Meeting-notes-summarizer.git
cd meeting-notes-summarizer
```

2. **Install dependencies**:

```bash
npm install
```

3. **Set up environment variables**:

Create a `.env` file in the /backend folder with all the required variables present in the `.env.sample` file in /backend

4. **Run the Server**:

```bash
npm run dev
```

Frontend:
```bash
cd frontend
npm install
npm run dev
```

## Usage

1. Enter your meeting notes into the input field or upload a file.
2. Provide your instruction/prompt.
3. Click "Summarize".
4. Receive a clean, organized summary with key points and action items.

## Folder Structure

```
├── backend
    ├── .env.sample
    ├── .gitignore
    ├── README.md
    ├── app.js
    ├── controllers
    │   ├── shareController.js
    │   └── summarizeController.js
    ├── middleware
    │   └── upload.js
    ├── package-lock.json
    ├── package.json
    ├── queues
    │   ├── emailQueue.js
    │   └── redisConnection.js
    ├── routes
    │   ├── shareRoutes.js
    │   └── summarize.js
    ├── server.js
    ├── services
    │   └── emailService.js
    ├── tests
    │   ├── email.test.js
    │   └── summarize.test.js
    ├── utils
    │   └── parseFile.js
    ├── worker.js
    └── workers
        └── emailWorker.js
└── frontend
    ├── .gitignore
    ├── README.md
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.js
    ├── public
        └── vite.svg
    ├── src
        ├── App.jsx
        ├── assets
        │   └── react.svg
        ├── components
        │   └── SummarizeForm.jsx
        ├── index.css
        └── main.jsx
    ├── tailwind.config.js
    └── vite.config.js

```

## Contact Author

**Ravi Mani**

Email: inforavimani@gmail.com  
GitHub: [Profile](https://github.com/ravimani1001)

