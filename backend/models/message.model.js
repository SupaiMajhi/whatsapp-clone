import mongoose, { Schema, model } from "mongoose";

const messageSchema = new Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    isSent: {
        type: Boolean,
        default: true,
    },
    sentAt: {
        type: Date,
        default: Date.now(),
    },
    isDelivered: {
        type: Boolean,
        default: false
    },
    deliveredAt: {
        type: Date,
    },
    isSeen: {
        type: Boolean,
        default: false,
    },
    readAt: {
        type: Date
    }
}, { timestamps: true });

const Message = model('Message', messageSchema);

export default Message;