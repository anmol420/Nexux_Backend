import { Router } from "express";
import {
    registerEmployer,
    uploadData,
    uploadJD,
    submitData
} from "../controllers/employer.controllers.js";

const router = Router();

router.post("/register", registerEmployer);
router.post("/uploadData", uploadData);
router.post("/uploadJD", uploadJD);
router.post("/submitData", submitData);

export default router;