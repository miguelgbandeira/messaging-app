import express, { NextFunction, Request, Response } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import chatsRoutes from "./routes/chats";
import usersRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import { isHttpError } from "http-errors";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGO_CONNECTION!);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

app.use("/chats", chatsRoutes);
app.use("/users", usersRoutes);
app.use("/auth", authRoutes);

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "Something went wrong";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.statusCode;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});
app.listen(port, () => {
  console.log("server running on port " + port);
});
