import { Router } from "express";
import {
  getCurrentUserProfile,
  updateCurrentUserProfile,
} from "./user.controller.js";

const router = Router();

// TODO: Get User details
router.get("/me", getCurrentUserProfile);

// TODO: Update User details
router.patch("/me", updateCurrentUserProfile);

export default router;
