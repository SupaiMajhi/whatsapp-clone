import { Router } from "express"; 
import { getStatusHandler, getAllUserHandler } from "../controller/user.controller.js";

const router = Router();

router.get("/status/:userId", getStatusHandler);
router.get('/all', getAllUserHandler);

export default router;
