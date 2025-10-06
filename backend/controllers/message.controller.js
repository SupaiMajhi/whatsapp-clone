import mongoose from "mongoose";
import { errorResponse, successfulResponse, sendMessageToSockets } from "../lib/lib.js";
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
            sendMessageToSockets(savedMsg.senderId, savedMsg.receiverId, savedMsg);
        }
        return successfulResponse(res, 200, 'sent successfully.', savedMsg);
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

    try {
        const chatList = await Message.aggregate([
            { 
                $match: {
                    $or: [ 
                        {senderId: mongoose.Types.ObjectId.createFromHexString(req.user.id)},
                        {receiverId: mongoose.Types.ObjectId.createFromHexString(req.user.id)}
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
                            { $eq: ['$lastMessage.senderId', mongoose.Types.ObjectId.createFromHexString(req.user.id)] },
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
            { $unwind: '$otherUser' },
            {
                $project: {
                    lastMessage: 1,
                    'otherUser._id': 1,
                    'otherUser.username': 1,
                    'otherUser.profilePic': 1
                }
            }
        ]);
        return successfulResponse(res, 200, 'success', chatList );
    } catch (error) {
        console.log("getChatListHandler Error", error.message);
        return errorResponse(res, 500, "Internal server error");
    }
}


export const getOfflineMessagesHandler = async (id) => {
    try {
        const messages = await Message.aggregate([
            {
                $match: {
                    $and: [
                        {receiverId: mongoose.Types.ObjectId.createFromHexString(id)},
                        { isDelivered: false }
                    ]
                }
            },
            {
                $sort: {createdAt: -1}
            },
            {
                $group: {
                    _id: '$senderId',
                    //:problem is here its only sending the one message that is the first coming out after the sort
                    message: {$push: '$$ROOT'}
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'otherUser'
                }
            },
            {
                $unwind: '$otherUser'
            },
            {
                $project: {
                    message: 1,
                    'otherUser._id': 1,
                    'otherUser.username': 1,
                    'otherUser.profilePic': 1
                }
            }
        ]);
        return messages;
    } catch (error) {
        console.log("fetchUndeliveredMessages Error", error.message);
        return [];
    }
}