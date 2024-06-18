import express from "express";
import { getUsers } from "../controllers/userControllers";
import { verifyToken } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", verifyToken, getUsers);

export default router;
