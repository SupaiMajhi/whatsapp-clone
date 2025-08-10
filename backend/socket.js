import express from "express";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { getUserIdFromReq, sendToUser } from "./util/util.js";
import User from "./models/user.model.js";
import Message from "./models/message.model.js";

export const app = express();
export const server = createServer(app);

const wss = new WebSocketServer({ server });
export const users = new Map();
export const onlineUsers = new Map();

wss.on('connection', async (ws, req) => {

    console.log("a user connected")
    const userId = await getUserIdFromReq(req);
    if(!userId) return;

    users.set(userId, ws);
    onlineUsers.set(userId, ws);

    ws.on('close', async () => {
        users.delete(userId);
        onlineUsers.delete(userId);

        await User.findByIdAndUpdate(userId, { lastSeen: new Date() });
    });
    
});

export const getReceiverSocket = (receiverId) => {
    return users.get(receiverId);
}