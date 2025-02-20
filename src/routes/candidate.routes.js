import { Router } from "express";
import {
    registerCandidate,
} from "../controllers/candidate.controllers.js";

const router = Router();

router.post("/register", registerCandidate);

export default router;