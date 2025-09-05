import { Router } from "express";
import { sendOtpHandler, loginHandler, signupHandler, checkAuthHandler } from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.post('/send-otp', sendOtpHandler);

router.post('/login', loginHandler);

router.post('/signup', signupHandler);

router.get('/check-auth', authMiddleware, checkAuthHandler)
export default router;