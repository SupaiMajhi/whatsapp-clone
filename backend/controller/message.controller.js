import WebSocket from "ws";
import Message from "../models/message.model.js";
import { getReceiverSocket } from "../socket.js";

export const getAllMsgHandler = async (req, res) => {
    const senderId = req.user._id;
    const receiverId = req.params.chatPartnerId;

    try {
        const messages = await Message.find({ $or: [ {senderId, receiverId}, {senderId: receiverId, receiverId: senderId} ] });
        return res.status(200).json({ 'msgType': 'success', data: messages });
    } catch (error) {
        return res.status(500).json({ msgType: "error", message: `getAllMsgHandler server error ${error.message}`});
    }
}

export const getAllChatListHandler = async (req, res) => {
  const userId = req.user._id;
  try {
    const lastMessages = await Message.aggregate([
      {
        $match: {
          $or: [{ senderId: userId }, { receiverId: userId }],
        },
      },
      {
        $project: {
          senderId: 1,
          receiverId: 1,
          content: 1,
          createdAt: 1,
          chatPartner: {
            $cond: [{ $eq: ["$senderId", userId] }, "$receiverId", "$senderId"],
          },
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $group: {
          _id: "$chatPartner",
          lastMessage: { $first: "$$ROOT" },
        },
      },
      {
        $lookup: {
          from: "users", // your collection name (ensure it's correct)
          localField: "_id", // this is chatPartner's _id
          foreignField: "_id",
          as: "chatPartnerInfo",
        },
      },
      {
        $unwind: "$chatPartnerInfo",
      },
      {
        $project: {
          lastMessage: 1,
          chatPartnerInfo: {
            _id: "$chatPartnerInfo._id",
            username: "$chatPartnerInfo.username",
          },
        },
      },
    ]);
    return res.json({ msgType: "success", data: lastMessages });
  } catch (error) {
    return res.status(500).json({ msgType: "error", message: `getAllChatListHandler server error ${error.message}`});
  }
}

export const sendNewMsgHandler = async (req, res) => {
  const senderId = req.user._id;
  const { receiverId } = req.params;
  const { content } = req.body;
  try {
    if(!receiverId || !content) return res.status(400).json({ "msgType": "error", "message": 'All fields are required'});
    
    //save to database
    const newMsg = new Message({
      senderId,
      receiverId,
      content //todo:save the message in encrypted format
    });
    await newMsg.save();

    //todo: send the msg in websocket to the respective socket
    const receiverSocket = getReceiverSocket(receiverId);
  
    //todo: if socket is not open or not based on that send message or send notification
      receiverSocket.send(JSON.stringify({
        type: 'NEW_MSG',
        content: newMsg
      }));
    return res.status(200).json({ 'msgType': 'success', 'message': 'sent successfully', 'data': newMsg });
  } catch (error) {
    return res.status(500).json({ msgType: "error", message: `sendNewMsgHandler server error ${error.message}`});
  }
}