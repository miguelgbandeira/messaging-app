import express from "express";
import { createUser, login, logout } from "../controllers/authController";
const router = express.Router();

router.post("/sign-up", createUser);
router.post("/login", login);
router.post("/logout", logout);

export default router;
