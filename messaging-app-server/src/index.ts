import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import chatsRoutes from "./routes/chats";
import usersRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import handleError from "./middleware/errorMiddleware";
import { app, server } from "./socket/socket";

dotenv.config();
const port = process.env.PORT;

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGO_CONNECTION!);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

app.use("/messages", chatsRoutes);
app.use("/users", usersRoutes);
app.use("/auth", authRoutes);

app.use(handleError);

server.listen(port, () => {
  console.log("server running on port " + port);
});
