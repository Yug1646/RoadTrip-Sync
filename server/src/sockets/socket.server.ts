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

    socket.on("trip:join", ({ tripId }) => {
      socket.join(`trip: ${tripId}`);
      socket.data.tripId = tripId;
      socket.to(`trip: ${tripId}`).emit("member:joined", {
        userId: socket.data.userId,
      });
    });

    socket.on("location:update", ({ tripId, lat, lng }) => {
      socket.to(`trip:${tripId}`).emit("location:update", {
        userId: socket.data.userId,
        lat,
        lng,
      });
    });
  });
}

export function getIO() {
  if (!io) throw new Error("Socket.IO not initialized");
  return io;
}
