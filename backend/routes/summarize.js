import express from "express";
import { summarizeController } from "../controllers/summarizeController.js";
import uploadMiddleware from "../middleware/upload.js";
import multer from "multer";

const router = express.Router();
// const upload = multer({ dest: "uploads/" }); // temp folder

// Accept either text OR file
router.post("/", uploadMiddleware("file"), summarizeController);

export default router;
