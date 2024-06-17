import jwt from "jsonwebtoken";
import User from "../models/user";
import { RequestHandler } from "express";
import createHttpError from "http-errors";

const verifyToken: RequestHandler = (req, res, next) => {
  // console.log('verifying token');
  // Get auth header value
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;

    // Verify token if defined
    jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
      if (err) {
        throw createHttpError(403, "Not authorized, invalid token");
      } else {
        req.authData = authData;
        next();
      }
    });
  } else {
    throw createHttpError(403, "Not authorized, no token");
  }
};

export { verifyToken };
