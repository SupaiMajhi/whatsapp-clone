import { Router } from "express";
import { getAllUsersHandler } from '../controllers/user.controller.js';

const router = Router();

router.get('/get-all-users', getAllUsersHandler)

export default router;