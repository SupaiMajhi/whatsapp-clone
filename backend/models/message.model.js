import mongoose, { Schema, model } from "mongoose";

const messageSchema = new Schema({
    senderId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    receiverId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
    },
    content: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['sent', 'delivered', 'seen', 'unseen'],
        default: 'sent'
    }
}, { timestamps: true });

const Message = model('Message', messageSchema);

export default Message;