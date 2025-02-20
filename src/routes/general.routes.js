import { Router } from "express";
import { login } from "../controllers/general.controllers.js";

const router = Router();

router.post("/login", login);

export default router;