import { Router } from "express";
import {
    registerCandidate,
    uploadResume,
    submitData,
} from "../controllers/candidate.controllers.js";

const router = Router();

router.post("/register", registerCandidate);
router.get("/uploadResume", uploadResume);
router.post("/submitData", submitData);

export default router;