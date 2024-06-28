import express from "express";
import {
  getAllMessagesFromChat,
  getChatById,
  getUserChats,
  sendMessage,
} from "../controllers/chatController";
import { verifyToken } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/send", verifyToken, sendMessage);
router.get("/user/chats", verifyToken, getUserChats);
router.get("/:chatId", verifyToken, getAllMessagesFromChat);
router.get("/chats/:chatId", verifyToken, getChatById);

export default router;
