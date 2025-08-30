import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
    phone: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
    },
    profilePic: {
        type: Object,
        default: null
    },
    lastSeen: {
        type: Date,
        default: Date.now()
    }
});

const User = model('User', userSchema);

export default User;