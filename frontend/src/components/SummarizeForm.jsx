import { useState } from "react";

export default function SummarizeForm() {
  const [file, setFile] = useState(null);
  const [transcriptText, setTranscriptText] = useState("");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");

  const [emails, setEmails] = useState("");
  const [subject, setSubject] = useState("Meeting Summary");


  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file && !transcriptText) {
      alert("Please provide a file or transcript text.");
      return;
    }
    setLoading(true);

    const formData = new FormData();
    if (file) formData.append("file", file);
    formData.append("transcriptText", transcriptText);
    formData.append("prompt", prompt);

    try {
      const res = await fetch("https://meeting-notes-summarizer-t8ti.onrender.com/api/summarize", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setSummary(data.summary);
    } catch (err) {
      console.error(err);
      alert("Error generating summary.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl w-full bg-white p-6 rounded shadow">
        <h1 className="text-2xl text-center mb-10 font-bold">Summarize Meeting Notes And Share Them</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Upload File (.txt/.doc)</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="mt-1 block w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block font-medium">Or Paste Transcript</label>
          <textarea
            value={transcriptText}
            onChange={(e) => setTranscriptText(e.target.value)}
            className="mt-1 block w-full border rounded p-2"
            rows={5}
          />
        </div>

        <div>
          <label className="block font-medium">Custom Instruction / Prompt</label>
          <input
            type="text"
            required
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="mt-1 block w-full border rounded p-2"
            placeholder="e.g. Summarize in bullet points for executives"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Generating..." : "Generate Summary"}
        </button>
      </form>

      {summary && (
        <div className="mt-10">
          <h2 className="font-semibold text-2xl mb-2">AI Generated Summary:</h2>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="w-full border rounded p-2"
            rows={10}
          />
        </div>
      )}

      {/* // Share form */}
        {summary && (
        <div className="mt-6">
            <h2 className="font-semibold text-2xl mb-2">Share Summary via Email</h2>
            <form
            onSubmit={async (e) => {
                e.preventDefault();
                if (!emails) {
                alert("Please enter at least one email.");
                return;
                }

                // Split by comma and trim spaces
                const recipients = emails.split(",").map((email) => email.trim());

                try {
                const res = await fetch("https://meeting-notes-summarizer-t8ti.onrender.com/api/share", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                    to: recipients,
                    subject,
                    text: summary,
                    }),
                });
                const data = await res.json();
                alert(data.message || "Emails sent successfully ✅");
                } catch (err) {
                console.error(err);
                alert("Error sending emails.");
                }
                finally{
                    setSummary("");
                }
            }}
            className="space-y-3"
            >
            <div>
                <label className="block font-medium">Recipient Emails (comma separated)</label>
                <input
                type="text"
                value={emails}
                onChange={(e) => setEmails(e.target.value)}
                className="mt-1 block w-full border rounded p-2"
                placeholder="alice@example.com, bob@example.com"
                />
            </div>

            <div>
                <label className="block font-medium">Subject</label>
                <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="mt-1 block w-full border rounded p-2"
                placeholder="Meeting Summary"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
                Send Emails
            </button>
            </form>
        </div>
        )}


    </div>
  );
}
