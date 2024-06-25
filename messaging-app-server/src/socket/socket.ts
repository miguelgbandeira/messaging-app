import express from "express";
import { Server } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

interface UserSocketMap {
  [userId: string]: string;
}

const userSocketMap: UserSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
  console.log("a user connect with id", socket.id);

  const userId = socket.handshake.query.userId as string | undefined;
  if (userId !== undefined) userSocketMap[userId] = socket.id;

  socket.on("disconnect", () => {
    console.log("user disconnected");
    if (userId !== undefined) delete userSocketMap[userId];
  });
});

export { app, io, server };
