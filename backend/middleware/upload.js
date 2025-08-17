import multer from "multer";
import path from "path";

// Allowed file extensions
const allowedExtensions = [".txt", ".docx"];

// Multer storage (memory for now — later can use disk/cloud)
const storage = multer.memoryStorage();

// Multer config
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();

    if (!allowedExtensions.includes(ext)) {
      return cb(new Error("Only .txt and .docx files are allowed"));
    }

    cb(null, true);
  },
});

// Middleware wrapper for single file upload
const uploadMiddleware = (fieldName) => (req, res, next) => {
  const singleUpload = upload.single(fieldName);

  singleUpload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // Multer-specific errors
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ error: "File size too large (max 5MB)" });
      }
      return res.status(400).json({ error: err.message });
    } else if (err) {
      // Other errors (like file extension)
      return res.status(400).json({ error: err.message });
    }
    next();
  });
};

export default uploadMiddleware;
