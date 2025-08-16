import express from "express";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { getUserIdFromReq, sendToUser } from "./util/util.js";
import User from "./models/user.model.js";

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
    //send online status
    wss.clients.forEach((ws) => {
        if(ws.readyState === WebSocket.OPEN){
            ws.send(JSON.stringify({
                type: 'USER_ONLINE',
                content: {
                    isOnline: onlineUsers.has(userId),
                    lastSeen: new Date()
                }
            }));
        }
    })

    ws.on('close', async () => {
        users.delete(userId);
        onlineUsers.delete(userId);
        
        wss.clients.forEach((ws) => {

            if(ws.readyState === WebSocket.OPEN){
                
                ws.send((JSON.stringify({
                    type: 'USER_OFFLINE',
                    content: {
                        isOnline: onlineUsers.has(userId),
                        lastSeen: new Date()
                    }
                })))
            }
        });
        await User.findByIdAndUpdate(userId, { lastSeen: new Date() });
    });
    
});

export const getReceiverSocket = (receiverId) => {
    return users.get(receiverId);
}