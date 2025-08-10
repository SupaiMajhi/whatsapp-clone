import mongoose, { model, Schema } from "mongoose";

const msgSchema = new Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    content: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Message = model("Message", msgSchema);

export default Message;