import { RequestHandler } from "express";
import ChatModel from "../models/chat";
import createHttpError from "http-errors";

export const getChats: RequestHandler = async (req, res, next) => {
  try {
    const chats = await ChatModel.find().exec();
    if (chats.length === 0) {
      throw createHttpError(404, "Chats not found");
    }
    res.status(200).json(chats);
  } catch (error) {
    next(error);
  }
};
interface CreateChatBody {
  users: string[];
  messages?: string[];
}

export const postChat: RequestHandler<
  unknown,
  unknown,
  CreateChatBody,
  unknown
> = async (req, res, next) => {
  const { users, messages } = req.body;

  try {
    if (users.length !== 2) {
      throw createHttpError(400, "Chat must have 2 users");
    }
    const newChat = await ChatModel.create({
      messages: messages ? messages : [],
      users: users,
    });
    res.status(201).json(newChat);
  } catch (error) {
    next(error);
  }
};
