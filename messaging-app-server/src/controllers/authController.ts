import { RequestHandler } from "express";
import generateToken from "../utils/generateToken";
import UserModel from "../models/user";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";

export const createUser: RequestHandler = async (req, res, next) => {
  const { username, password } = req.body;

  if (username.length > 10) {
    return res
      .status(400)
      .json({ error: "Username must not exceed 10 characters" });
  }

  if (password.length < 8 || password.length > 30) {
    return res
      .status(400)
      .json({ error: "Password must be between 8 and 30 characters long" });
  }

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
      createdAt: new Date(),
    });

    if (newUser) {
      const token = generateToken(res, newUser._id);
      return res.status(201).json({ user: newUser._id, token: token });
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

    if (
      !existingUser ||
      !(await bcrypt.compare(password, existingUser.password))
    ) {
      throw createHttpError(401, "Incorrect credentials");
    }
    const token = generateToken(res, existingUser._id);
    return res.status(201).json({ user: existingUser._id, token: token });
  } catch (error) {
    next(error);
  }
};

export const logout: RequestHandler = async (req, res, next) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: "User successfully logged out" });
  } catch (error) {
    next(error);
  }
};
