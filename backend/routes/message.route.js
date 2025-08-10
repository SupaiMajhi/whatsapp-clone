import { Router } from "express";
import { getAllMsgHandler, getAllChatListHandler, sendNewMsgHandler } from "../controller/message.controller.js";

const router = Router();


router.get("/chatList", getAllChatListHandler);
router.get('/:chatPartnerId', getAllMsgHandler);
router.post('/:receiverId', sendNewMsgHandler);

export default router;
