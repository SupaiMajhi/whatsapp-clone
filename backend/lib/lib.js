import mongoose from 'mongoose';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import cookie from "cookie";
import User from '../models/user.model.js';
import { clients } from '../socket.js';

export const connectToDB = () => {
    mongoose
    .connect(process.env.MONGODB_URL)    
    .then(() => console.log('db connected'))
    .catch((e) => console.log(e.message))
}

export const errorResponse = (res, code, message) => {
    return res.status(code).json({ 'msgType': 'error', message });
}

export const successfulResponse = (res, code, message, data) => {
    return res.status(code).json({ 'msgType': 'success', message, data });
}

export const isValidPhoneNumber = (phone) => {
    // Example regex for a 10-digit number, optionally with country code and separators
    const regex = /^\+?[1-9]\d{1,14}$/;
    return regex.test(phone);
}

export const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000);
}

export const hashedPassword = async (password) => {
    const hash = await bcrypt.hash(password, 10);
    return hash;
}

export const generateToken = async (phone) => {
    return jwt.sign(phone, process.env.JWT_SECRET_KEY);
}

export const retrieveIdFromReq = async (req) => {
    const { token } = cookie.parse(req.headers.cookie);
    if(!token) return null;
    const isVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if(!isVerified) return null;
    const user = await User.findOne({ phone: isVerified });
    if(!user) return null;
    return user.id;
}

export const sendViaSocket = (id, msg) => {
    let socket = clients.get(id);
    if(socket && socket.readyState === WebSocket.OPEN){
        socket.send(JSON.stringify({
            type: 'NEW_MSG',
            content: {
                data: msg
            }
        }));
    }
    return;
}