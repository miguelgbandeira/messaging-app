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
    if (!existingUser || existingUser.password !== password) {
      throw createHttpError(400, "Incorrect credentials");
    }
    return res.status(200).json({ message: "user successfully logged in" });
  } catch (error) {
    next(error);
  }
};
