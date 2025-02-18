

import express from "express";
import { registerCandidate, loginCandidate } from "../controllers/candidateAuthController.js";
import upload from "../middlewares/uploadMiddleware.js"; // Middleware for handling PDF uploads

const router = express.Router();

router.post("/register", upload.single("pdf"), registerCandidate);
router.post("/login", loginCandidate);

export default router;
