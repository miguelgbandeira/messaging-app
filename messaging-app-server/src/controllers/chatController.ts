import { RequestHandler } from "express";
import Chat from "../models/chat";
import Message from "../models/message";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { getReceiverSocketId, io } from "../socket/socket";

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

    const receiverSocketId = getReceiverSocketId(sentTo);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    console.log("emitted message to", receiverSocketId, sentTo);

    res.status(201).json(newMessage);
  } catch (error) {
    next(error);
  }
};

export const getUserChats: RequestHandler = async (req, res) => {
  const user = req.user._id;

  const chats = await Chat.aggregate([
    { $match: { users: user } },
    {
      $lookup: {
        from: "messages",
        localField: "last_message",
        foreignField: "_id",
        as: "last_message",
      },
    },
    { $unwind: "$last_message" },
    {
      $lookup: {
        from: "users",
        localField: "users",
        foreignField: "_id",
        as: "users",
      },
    },
    {
      $project: {
        _id: 1,
        users: { _id: 1, username: 1 },
        last_message: 1,
      },
    },
    { $sort: { "last_message.timestamp": -1 } },
  ]);

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

export const getChatById: RequestHandler = async (req, res, next) => {
  try {
    const chatId = req.params.chatId;

    if (!mongoose.Types.ObjectId.isValid(chatId)) {
      throw createHttpError(404, "Chat not found");
    }

    const chat = await Chat.findById(chatId).populate("users");

    if (!chat) {
      throw createHttpError(404, "Chat not found");
    }

    if (!chat.users.some((userId) => userId.equals(req.user._id))) {
      throw createHttpError(403, "Not authorized");
    }

    res.status(200).json(chat);
  } catch (error) {
    next(error);
  }
};
