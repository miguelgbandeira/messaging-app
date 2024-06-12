import express from "express";
import { createUser, login } from "../controllers/authController";
const router = express.Router();

router.post("/sign-up", createUser);
router.post("/login", login);

export default router;
