import jwt from "jsonwebtoken";
import User from "../models/user";
import { RequestHandler } from "express";
import createHttpError from "http-errors";

const protect: RequestHandler = async (req, res, next) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  const token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId);
      next();
    } catch (error) {
      throw createHttpError(403, "Not authorized, invalid token");
    }
  } else {
    throw createHttpError(403, "Not authorized, no token");
  }
};

export { protect };
