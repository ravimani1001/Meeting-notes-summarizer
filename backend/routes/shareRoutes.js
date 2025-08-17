// routes/shareRoutes.js
import express from "express";
import { shareController } from "../controllers/shareController.js";

const router = express.Router();

// POST /api/share
router.post("/", shareController.shareByEmail);

export default router;
