import express from "express";
import { getChats, postChat } from "../controllers/chatController";

const router = express.Router();

router.get("/", getChats);
router.post("/", postChat);

export default router;
