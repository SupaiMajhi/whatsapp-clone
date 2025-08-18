import { Router } from "express"; 
import upload from "../middleware/multer.middleware.js";
import { getStatusHandler, getAllUserHandler, updateAvatarHandler, deleteAvatarHandler } from "../controller/user.controller.js";

const router = Router();

router.get("/status/:userId", getStatusHandler);
router.get('/all', getAllUserHandler);
router.put('/update/avatar', upload.single('avatar'), updateAvatarHandler);
router.delete('/delete/avatar', deleteAvatarHandler)

export default router;
