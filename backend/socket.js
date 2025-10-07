import { WebSocket, WebSocketServer } from "ws";
import { retrieveIdFromReq } from "./lib/lib.js";
import User from "./models/user.model.js";
import Message from "./models/message.model.js";
import { getOfflineMessagesHandler } from "./controllers/message.controller.js";

export const clients = new Map();
export const onlineUser = new Map();
export const setupWebSocketServer = (server) => {
    const wss = new WebSocketServer({ server });

    wss.on("connection", async (ws, req) => {
        const id = await retrieveIdFromReq(req);
        ws.id = id;
        clients.set(id, ws);
        onlineUser.set(id, ws);

        //everytime a user comes online, fetch all the undelivered messages
        const offlineMessages = await getOfflineMessagesHandler(id);
        if(offlineMessages.length > 0){
            ws.send(JSON.stringify({
                type: 'offline_msg',
                content: {
                    data: offlineMessages //can be an array
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
                const updatedMessages = [];
                //if content.data is an array
                if(Array.isArray(message.content.data)){
                    for(const msg of message.content.data){
                        //check for ack is coming from receiverId
                        if(ws.id === msg.receiverId){
                             //todo: optimize the db write, for now problem is that for example for a specific user if there are multiple msg that has to update, currently we are updating them one by one by which there are so many db writes going on, but optimization is if we can batch the messages for the same user then the db write will be become less
                            //one way to obtain this is first use updateMany and then use db.find with $in where id will be equal to the ids of data
                            let newMsg = await Message.findByIdAndUpdate(msg._id, {isDelivered: true, deliveredAt: message.content.time}, {new: true});
                            updatedMessages.push(newMsg);
                        }
                    }
                }
                //else if not an array
                else{
                    if(ws.id === message.content.data.receiverId){
                        let newMsg = await Message.findByIdAndUpdate(message.content.data._id, {isDelivered: true, deliveredAt: message.content.time}, {new: true});
                        updatedMessages.push(newMsg);
                    }
                }
               
                
                //todo: in future there will be group chat also, in which there can be multiple sender, but for now we are assuming that sender id is same for all the messages                    
                //todo: same here if we can optimize this also, for the same sender if we can batch all the msg and then send them to the end user
                console.log(updatedMessages);
                updatedMessages.forEach((msg) => {
                    const senderSocket = clients.get(msg.senderId.toString());

                    if(senderSocket && senderSocket.readyState === WebSocket.OPEN){
                        senderSocket.send(JSON.stringify({
                            type: 'msg_delivered',
                            content: {
                                data: msg
                            }
                        }));
                    }
                //todo: figure out a logic for when sendersocket is offline
                })
            }          

            if(message.type === 'markAsSeen'){
                //update the status of the message
                if(Array.isArray(message.content.data)){
                    
                        await Message.updateMany({ _id: { $in: message.content.data }}, { $set: { isSeen: true , readAt: new Date() }});

                        //fetch the messages
                        const updatedMessages = await Message.find({ _id: { $in: message.content.data }}, { _id: 1, isSeen: 1, readAt: 1 });
                        //send the ack to sender
                        const senderSocket = clients.get(message.content.senderId);
                        console.log(senderSocket)
                        if(senderSocket && senderSocket.readyState === WebSocket.OPEN){
                            senderSocket.send(JSON.stringify({
                                type: "message_seen",
                                content: {
                                    data: updatedMessages,
                                }
                            }))
                        }
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
