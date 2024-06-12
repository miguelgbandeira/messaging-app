import { RequestHandler } from "express";
import UserModel from "../models/user";
import createHttpError from "http-errors";

export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const chats = await UserModel.find().exec();
    if (chats.length === 0) {
      throw createHttpError(404, "Users not found");
    }
    res.status(200).json(chats);
  } catch (error) {
    next(error);
  }
};
