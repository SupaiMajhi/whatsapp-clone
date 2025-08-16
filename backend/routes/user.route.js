import { Router } from "express"; 
import upload from "../middleware/multer.middleware.js";
import { getStatusHandler, getAllUserHandler } from "../controller/user.controller.js";

const router = Router();

router.get("/status/:userId", getStatusHandler);
router.get('/all', getAllUserHandler);
router.post('/upload/avatar', upload.single('avatar'), uploadAvatarHandler);

export default router;
