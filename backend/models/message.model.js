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
    text: {
        type: String,
    },
    media: {
        type: Array, //if type array creates any problem then i will think about something else
    },
    isTypeMedia: {
        type: Boolean,
        default: false,
    },
    isSent: {
        type: Boolean,
        default: true,
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