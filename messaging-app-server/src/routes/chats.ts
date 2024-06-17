import express from "express";
import {
  getChats,
  getUserChats,
  postChat,
} from "../controllers/chatController";
import { verifyToken } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", getChats);
router.post("/", postChat);
router.get("/user/chats", verifyToken, getUserChats);

export default router;
