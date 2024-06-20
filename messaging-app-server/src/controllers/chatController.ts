import { RequestHandler } from "express";
import Chat from "../models/chat";
import Message from "../models/message";
import createHttpError from "http-errors";
import mongoose from "mongoose";

interface CreateChatBody {
  message: string;
  sentFrom: string;
  sentTo: string;
}

export const sendMessage: RequestHandler<
  unknown,
  unknown,
  CreateChatBody,
  unknown
> = async (req, res, next) => {
  const { message, sentFrom, sentTo } = req.body;
  const sentFromObjectId = new mongoose.Types.ObjectId(sentFrom);

  try {
    //check if already exists a chat with that user, otherwise create one
    let chat = await Chat.findOne({
      users: { $all: [sentFrom, sentTo], $size: 2 },
    });

    if (!req.user._id.equals(sentFromObjectId)) {
      throw createHttpError(403, "Not authorized");
    }

    if (!chat) {
      chat = new Chat({ users: [sentFrom, sentTo] });
      await chat.save();
    }

    const newMessage = new Message({
      chatId: chat._id,
      message: message,
      sentFrom: sentFrom,
      sentTo: sentTo,
      timestamp: new Date(),
    });

    await newMessage.save();

    chat.last_message = newMessage._id;
    await chat.save();

    res.status(201).json(newMessage);
  } catch (error) {
    next(error);
  }
};

export const getUserChats: RequestHandler = async (req, res) => {
  const user = req.user._id;

  const chats = await Chat.find({ users: user })
    .populate("last_message")
    .populate("users", "username");

  if (!chats) {
    throw createHttpError(404, "Chats not found");
  }

  return res.status(200).json(chats);
};

export const getAllMessagesFromChat: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const chatId = req.params.chatId;

    if (!mongoose.Types.ObjectId.isValid(chatId)) {
      throw createHttpError(404, "Chat not found");
    }

    const chat = await Chat.findById(chatId);

    if (!chat) {
      throw createHttpError(404, "Chat not found");
    }

    if (!chat.users.includes(req.user._id)) {
      throw createHttpError(403, "Not authorized");
    }

    const messages = await Message.find({ chatId: chatId });
    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};
