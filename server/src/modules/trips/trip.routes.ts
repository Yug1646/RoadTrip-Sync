import { Router } from "express";
import {
  createTrip,
  deleteTrip,
  getMyTrips,
  getTripById,
  joinTrip,
  updateTrip,
} from "./trip.controller.js";

import { authMiddleware } from "../../middleware/auth.js";

const router = Router();

// TODO: Create new Trip
router.post("/", authMiddleware, createTrip);

// TODO: Get all trips
router.get("/", authMiddleware, getMyTrips);

// TODO: Get trip by members
router.get("/:tripId", authMiddleware, getTripById);

// TODO: Update Trip details
router.patch("/:tripId", authMiddleware, updateTrip);

// TODO: Delete Trip
router.delete("/:tripId", authMiddleware, deleteTrip);

// TODO: Create Join Code
router.post("/join", authMiddleware, joinTrip);
export default router;
