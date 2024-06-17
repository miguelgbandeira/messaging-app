import express from "express";
import { createUser, login, logout } from "../controllers/authController";
import { protect } from "../middleware/authMiddleware";
const router = express.Router();

router.post("/sign-up", createUser);
router.post("/login", login);
router.post("/logout", logout);
router.get("/verify-token", protect, (req, res) => {
  res.status(200).json({ user: req.user });
});

export default router;
