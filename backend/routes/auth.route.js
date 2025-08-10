import { Router } from "express";
import { authMiddleware } from "../util/middleware.js";
import { loginHandler, signUpHandler, checkAuthHandler } from "../controller/auth.controller.js";

const router = Router();

router.post('/register', signUpHandler);

router.post('/login', loginHandler);

router.get('/check-auth', authMiddleware, checkAuthHandler)

export default router;