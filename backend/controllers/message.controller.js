import mongoose from "mongoose";
import { errorResponse, successfulResponse, sendViaSocket } from "../lib/lib.js";
import Message from "../models/message.model.js";

export const sendMsgHandler = async (req, res) => {
    const senderId = req.user.id;
    const { receiverId } = req.params;
    const { content } = req.body;
    if(!senderId || !receiverId || !content)  return errorResponse(res, 400, 'something is wrong');
    try {
        const newMsg = new Message({
            senderId,
            receiverId,
            content
        });
        const savedMsg = await newMsg.save();
        if(savedMsg){
            //todo: send msg via websocket
            sendViaSocket(receiverId, savedMsg);
        }
        return successfulResponse(res, 200, 'sent successfully.');
    } catch (error) {
        console.log('sendMsgHandler Error', error.message);
        return errorResponse(res, 500, 'Internal server error');
    }
}

export const deleteMsgHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const isDeleted = await Message.findByIdAndDelete(id);
        if(!isDeleted) return errorResponse(res, 400, 'unable to delete');
        return successfulResponse(res, 200, 'deleted successfully.', isDeleted); //todo: make the ui like in the whatsapp for the successful deleted msg
    } catch (error) {
      console.log("deleteMsgHandler Error", error.message);
    return errorResponse(res, 500, "Internal server error");
    }
}

export const updateMsgHandler = async (req, res) => {
    const { id } = req.params;
    const { content }  = req.body;
    if(!content || !id) return errorResponse(res, 400, 'unable to update.');
    try {
        const isUpadated = await Message.findByIdAndUpdate(id, { content }, { new: true });
        if(!isUpadated) return errorResponse(res, 400, 'unable to update');
        return successfulResponse(res, 200, 'updated successfully.', isUpadated);
    } catch (error) {
        console.log("updateMsgHandler Error", error.message);
        return errorResponse(res, 500, "Internal server error");
    }
}

export const getAllMsgHandler = async (req, res) => {
    const senderId = req.user.id;
    const { receiverId } = req.params;
    if(!senderId || !receiverId) return errorResponse(res, 400, 'something went wrong, please try again');
    try {
        const messages = await Message.find({ $or: [ {senderId: senderId, receiverId: receiverId}, {senderId: receiverId, receiverId:senderId} ]});
        return successfulResponse(res, 200, 'successfully.', messages);
    } catch (error) {
        console.log("getAllMsgHandler Error", error.message);
        return errorResponse(res, 500, "Internal server error");
    }
}

export const getChatListHandler = async (req, res) => {
    const userId = req.params.id;
    try {
        const chatList = await Message.aggregate([
            { 
                $match: {
                    $or: [ 
                        {senderId: mongoose.Types.ObjectId.createFromHexString(userId)},
                        {receiverId: mongoose.Types.ObjectId.createFromHexString(userId)}
                    ]
                }
            },
            {
                $sort: { createdAt: -1 }
            },
            {
                $group: {
                    _id: {
                        $cond: [
                            { $lt: ['$senderId', '$receiverId'] },
                            {senderId: '$senderId', receiverId: '$receiverId'},
                            {senderId: '$receiverId', receiverId: '$senderId'}
                        ]
                    },
                    lastMessage: { $first: '$$ROOT' }
                }
            },
            {
                $addFields: {
                    otherUserId: {
                        $cond: [
                            { $eq: ['$lastMessage.senderId', mongoose.Types.ObjectId.createFromHexString(userId)] },
                            '$lastMessage.receiverId',
                            '$lastMessage.senderId'
                        ]
                    }
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'otherUserId',
                    foreignField: '_id',
                    as: 'otherUser'
                }
            },
            { $unwind: '$otherUsers' },
            {
                $project: {
                    lastMessage: 1,
                    'otherUser.username': 1,
                    'otherUser.profilePic': 1
                }
            }
        ]);
        return res.json({chatList});
    } catch (error) {
        console.log("getChatListHandler Error", error.message);
        return errorResponse(res, 500, "Internal server error");
    }
}


export const fetchUndeliveredMessages = async (id) => {
    try {
        const messages = await Message.find({ $and: [ { receiverId: id }, { status: 'sent' }]});
        return messages;
    } catch (error) {
        console.log("fetchUndeliveredMessages Error", error.message);
        return [];
    }
}