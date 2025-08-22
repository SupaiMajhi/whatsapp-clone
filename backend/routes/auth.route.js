import { Router } from "express";
import { authMiddleware } from "../middleware/middleware.js";
import { loginHandler, signUpHandler, checkAuthHandler, logoutHandler } from "../controller/auth.controller.js";

const router = Router();

router.post('/register', signUpHandler);

router.post('/login', loginHandler);

router.post('/logout', logoutHandler)

router.get('/check-auth', authMiddleware, checkAuthHandler);

export default router;