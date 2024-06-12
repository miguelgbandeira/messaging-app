import { RequestHandler } from "express";
import UserModel from "../models/user";
import createHttpError from "http-errors";

export const createUser: RequestHandler = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const existingUser = await UserModel.findOne({ username: username });
    if (existingUser) {
      throw createHttpError(409, "User with that username already exists");
    }
    const newUser = await UserModel.create({
      username: username,
      password: password,
    });
    return res.status(201).json(newUser._id);
  } catch (error) {
    next(error);
  }
};

export const login: RequestHandler = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ username: username })
      .select("+password")
      .exec();
    if (!existingUser) {
      throw createHttpError(404, "User with that username doesn't exist");
    } else if (existingUser.password === password) {
      return res.status(200).json({ message: "user sucessfully logged in" });
    }
  } catch (error) {
    next(error);
  }
};
