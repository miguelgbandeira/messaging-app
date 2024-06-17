import jwt from "jsonwebtoken";
import User from "../models/user";
import { RequestHandler } from "express";
import createHttpError from "http-errors";

const protect: RequestHandler = async (req, res, next) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  const bearerHeader = req.headers["authorization"];

  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1];

    if (bearerToken) {
      try {
        const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId);
        next();
      } catch (error) {
        throw createHttpError(403, "Not authorized, invalid token");
      }
    } else {
      throw createHttpError(403, "Not authorized, no token");
    }
  }
};

export { protect };
