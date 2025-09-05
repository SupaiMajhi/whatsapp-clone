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
        ws.send(JSON.stringify({
            type: 'offline_msg',
            content: {
                data: messages
            }
        }));


        wss.clients.forEach((ws) => {
            if(ws.readyState === WebSocket.OPEN){
                ws.send(JSON.stringify({
                    type: 'USER_ONLINE',
                    content: {
                        online: onlineUser.has(id)
                    }
                }))
            }
        })


        ws.on('message', async (event) => {
            const message = JSON.parse(event.data);

            if(message.type === 'DELIVERED'){
                if(Array.isArray(message.content.data)){
                    message.content.data.forEach(async (msg) => {
                        const senderId = msg.senderId;
                        const senderSocket = clients.get(senderId);
                        await Message.findByIdAndUpdate(msg.id, { status: 'delivered' }, { new: true });
                        if(senderSocket && senderSocket.readyState === WebSocket.OPEN){
                            senderSocket.send(JSON.stringify({
                                type: 'DELIVERED',
                                content: {
                                    data: msg
                                }
                            }))
                        }
                    });
                    //send sender socket a message about message delivered successfully
                }
            }
        })


        ws.on('close', async () => {
                onlineUser.delete(id);
                await User.findByIdAndUpdate(id, { lastSeen: new Date.now() });
                wss.clients.forEach((ws) => {
                if(ws.readyState === WebSocket.OPEN){
                    ws.send(JSON.stringify({
                        type: 'USER_OFFLINE',
                        content: {
                            online: onlineUser.has(id),
                            lastSeen: new Date.now()
                        }
                    }))
                }
            })
        });
    });
}
