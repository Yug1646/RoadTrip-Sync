import { Router } from "express";
import {
  getAuthenticatedUser,
  loginUser,
  registerUser,
} from "./auth.controller.js";
import { authMiddleware } from "../../middleware/auth.js";

const router = Router();

// TODO: Register new user
router.post("/register", registerUser);

// TODO: User login
router.post("/login", loginUser);

// TODO: Get authenticated user
router.get("/me", authMiddleware, getAuthenticatedUser);

export default router;
