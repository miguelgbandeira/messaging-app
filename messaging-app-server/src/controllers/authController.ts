import { RequestHandler } from "express";
import generateToken from "../utils/generateToken";
import UserModel from "../models/user";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";

export const createUser: RequestHandler = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const existingUser = await UserModel.findOne({ username: username });
    if (existingUser) {
      throw createHttpError(
        409,
        "Username already taken. Please choose a different one or log in instead"
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await UserModel.create({
      username: username,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(res, newUser._id);
      return res.status(201).json(newUser._id);
    }
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
