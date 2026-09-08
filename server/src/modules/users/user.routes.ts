import { Router } from "express";
import {
  getCurrentUserProfile,
  updateCurrentUserProfile,
} from "./user.controller.js";
import { authMiddleware } from "../../middleware/auth.js";

const router = Router();

// TODO: Get User details
router.get("/me", authMiddleware, getCurrentUserProfile);

// TODO: Update User details
router.patch("/me", authMiddleware, updateCurrentUserProfile);

export default router;
