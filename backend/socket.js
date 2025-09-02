import { WebSocketServer } from "ws";
import { retrieveIdFromReq } from "./lib/lib.js";

export const clients = new Map();
export const setupWebSocketServer = (server) => {
    const wss = new WebSocketServer({ server });

    wss.on("connection", async (ws, req) => {
        console.log('a user connected');
        const id = await retrieveIdFromReq(req);
        ws.id = id;
        clients.set(id, ws);

        ws.send('something');
    });
}
