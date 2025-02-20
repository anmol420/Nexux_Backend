import { Router } from "express";
import {
    registerEmployer,
} from "../controllers/employer.controllers.js";

const router = Router();

router.post("/register", registerEmployer);

export default router;