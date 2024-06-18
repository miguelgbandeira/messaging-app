import { RequestHandler } from "express";
import Chat from "../models/chat";
import Message from "../models/message";
import createHttpError from "http-errors";
import { User } from "../models/user";

interface CreateChatBody {
  message: string;
  sentFrom: User;
  sentTo: User;
}

export const sendMessage: RequestHandler<
  unknown,
  unknown,
  CreateChatBody,
  unknown
> = async (req, res, next) => {
  const { message, sentFrom, sentTo } = req.body;

  try {
    //check if already exists a chat with that user, otherwise create one
    let chat = await Chat.findOne({ users: [sentFrom, sentTo] });
    if (req.user._id !== sentFrom) {
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

  console.log(user);

  const chats = await Chat.find({ users: user })
    .populate("last_message")
    .populate("users", "username");

  if (!chats) {
    throw createHttpError(404, "Chats not found");
  }

  return res.status(200).json(chats);
};
