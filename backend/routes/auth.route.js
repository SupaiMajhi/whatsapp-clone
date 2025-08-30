import { Router } from "express";
import { getOtpHandler } from "../controllers/auth.controller.js";

const router = Router();

router.post('/get-otp', getOtpHandler)
export default router;