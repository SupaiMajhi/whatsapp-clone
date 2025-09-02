import { Router } from "express";
import { sendOtpHandler, loginHandler, signupHandler } from "../controllers/auth.controller.js";

const router = Router();

router.post('/send-otp', sendOtpHandler);

router.post('/login', loginHandler);

router.post('/signup', signupHandler);
export default router;