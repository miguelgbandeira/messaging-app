import jwt from "jsonwebtoken";
import { RequestHandler } from "express";
import User from "../models/user";

const verifyToken: RequestHandler = async (req, res, next) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;

    try {
      const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);

      if (!user) {
        return res.status(403).json({ error: "Not authorized" });
      }

      req.user = user;
      next();
    } catch (err) {
      return res.status(403).json({ error: "Not authorized" });
    }
  } else {
    return res.status(403).json({ error: "Not authorized" });
  }
};

export { verifyToken };
