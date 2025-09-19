import { WebSocket, WebSocketServer } from "ws";
import { retrieveIdFromReq } from "./lib/lib.js";
import User from "./models/user.model.js";
import { fetchUndeliveredMessages } from "./controllers/message.controller.js";
import Message from "./models/message.model.js";

export const clients = new Map();
export const onlineUser = new Map();
export const setupWebSocketServer = (server) => {
    const wss = new WebSocketServer({ server });

    wss.on("connection", async (ws, req) => {
        const id = await retrieveIdFromReq(req);
        ws.id = id;
        clients.set(id, ws);
        onlineUser.set(id, ws);

        //fetch all the undelivered messages
        const messages = await fetchUndeliveredMessages(id);
        if(messages.length > 0){
            ws.send(JSON.stringify({
                type: 'offline_msg',
                content: {
                    data: messages
                }
            }));
        }

        //send when user comes online
        wss.clients.forEach((ws) => {
            if(ws.readyState === WebSocket.OPEN){
                ws.send(JSON.stringify({
                    type: 'USER_ONLINE',
                    content: {
                        isOnline: onlineUser.has(id)
                    }
                }))
            }
        })


        ws.on('message', async(event) => {
            const message = JSON.parse(event);

            if(message.type === 'markAsDelivered'){
                if(Array.isArray(message.content.data)){
                    message.content.data.forEach(async (msg) => {
                        const senderId = msg.senderId;
                        const senderSocket = clients.get(senderId);
                        let newMsg = await Message.findByIdAndUpdate(msg._id, { isDelivered: true }, { new: true });
                        
                        //send sender ack
                        if(senderSocket && senderSocket.readyState === WebSocket.OPEN){
                            senderSocket.send(JSON.stringify({
                                type: 'DELIVERED',
                                content: {
                                    data: newMsg
                                }
                            }))
                        }
                    })
                }
            }

            if(message.type === 'markAsSeen'){
                //update the status of the message
                if(Array.isArray(message.content.data)){
                    message.content.data.forEach( async() => {
                        await Message.updateMany({ _id: { $in: message.content.data }}, { $set: { isSeen: true , readAt: new Date() }});
                        //send the ack to sender
                        const senderSocket = clients.get(message.content.senderId);
                        if(senderSocket && senderSocket.readyState === WebSocket.OPEN){
                            senderSocket.send(JSON.stringify({
                                type: "SEEN",
                                content: {
                                    data: message.content.data,

                                }
                            }))
                        }
                    })
                }
            }
        })


        ws.on('close', async () => {
                onlineUser.delete(id);
                await User.findByIdAndUpdate(id, { lastSeen: new Date() });
                wss.clients.forEach((ws) => {
                if(ws.readyState === WebSocket.OPEN){
                    ws.send(JSON.stringify({
                        type: 'USER_OFFLINE',
                        content: {
                            isOnline: false,
                            lastSeen: new Date()
                        }
                    }))
                }
            })
        });
    });
}
