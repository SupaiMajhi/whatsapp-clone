import { Router } from "express";
import { sendMsgHandler, deleteMsgHandler, updateMsgHandler, getAllMsgHandler, getChatListHandler } from "../controllers/message.controller.js";


const router = Router();
//send message
router.post('/send-message/:receiverId', sendMsgHandler);

//delete message
router.delete('/delete-message/:id', deleteMsgHandler);

//update message
router.patch('/update-message/:id', updateMsgHandler);

//get all message
router.get('/get-all-message/:receiverId', getAllMsgHandler);

//get all prev message as chat list
router.get('/get-all-chatList', getChatListHandler);

export default router;