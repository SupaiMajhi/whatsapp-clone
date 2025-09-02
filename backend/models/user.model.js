import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
    phone: {
        type: String,
        unique: true,
        required: true,
    },
    username: {
        type: String
    },
    password: {
        type: String,
        require: true,
    },
    profilePic: {
        type: Object,
        default: null
    },
    lastSeen: {
        type: Date,
        default: Date.now()
    }
}, { timestamps: true });

const User = model('User', userSchema);

export default User;