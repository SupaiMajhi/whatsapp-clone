import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import cookie from "cookie";
import { onlineUsers } from "../socket.js";

export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);

    return await bcrypt.hash(password, salt);
}

export const generateCookie = (phone) => {
    return jwt.sign({phone}, process.env.JWT_SECRET_KEY);
}

export const getUserIdFromReq = async (req) => {
    const { token } = cookie.parse(req.headers.cookie);
    if(!token) return null;
    try {
        const { phone } = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const verifyUser = await User.findOne({ phone }).select("-password");
        if(!verifyUser) return null;
        return verifyUser.id;
    } catch (error) {
        return null;
    }
}

export const broadcastStatus = (onlineUsers, userId, isOnline) => {
    const payload = JSON.stringify({
        type: 'status-change',
        userId,
        isOnline
    });
    for(let [otherUserId, ws] of onlineUsers.entries()) {
        
    }
}

export const sendToUser = (receiverId, content) => {
    const socket = onlineUsers.get(receiverId);
    if(socket && socket.readyState === WebSocket.OPEN){
        socket.send(JSON.stringify({
            type: 'new_message',
            payload: {
                content
            }
        }));
    }
}