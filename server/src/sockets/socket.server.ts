import { Server } from "socket.io";
import { verifyToken } from "../utils/jwt.js";
import type { Server as HttpServer } from "node:http";

let io: Server;

export function initSocketServer(httpServer: HttpServer) {
  io = new Server(httpServer, {
    cors: { origin: "*" },
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    try {
      socket.data.userId = verifyToken(token).userId;
      next();
    } catch (error) {
      next(new Error("Unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    console.log("Client Connected: ", socket.id);

    socket.on("disconnect", (reason) => {
      console.log("Client Disconnected: ", reason);
    });
  });
}

export function getIO() {
  if (!io) throw new Error("Socket.IO not initialized");
  return io;
}
