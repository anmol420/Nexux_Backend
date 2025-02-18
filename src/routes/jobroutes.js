import express from "express";
import { postJob, getJobsByEmployer } from "../controllers/jobController.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post("/", upload.single("jdPdf"), postJob);
router.get("/:employerId", getJobsByEmployer);

export default router;
