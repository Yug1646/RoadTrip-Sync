import { Router } from "express";
import {
  getTripLocation,
  updateVehicleLocation,
} from "./location.controller.js";
import { authMiddleware } from "../../middleware/auth.js";

const router = Router();

// TODO: Update current location
router.put("/:tripId/location", authMiddleware, updateVehicleLocation);

// TODO: All members location
router.get("/:tripId/locations", authMiddleware, getTripLocation);

export default router;
