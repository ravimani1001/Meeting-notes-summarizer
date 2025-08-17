import mammoth from "mammoth";
import path from "path";

export const parseFile = async (file) => {
  const ext = path.extname(file.originalname).toLowerCase();

  if (ext === ".txt") {
    return file.buffer.toString("utf-8");
  }

  if (ext === ".docx") {
    const result = await mammoth.extractRawText({ buffer: file.buffer });
    return result.value; // plain text
  }

  // optional PDF support later
  if (ext === ".pdf") {
    throw new Error("PDF parsing not yet implemented.");
  }

  throw new Error("Unsupported file type.");
};
