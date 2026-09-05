import { Router } from "express";
import {
  createTrip,
  deleteTrip,
  getMyTrips,
  getTripById,
  updateTrip,
} from "./trip.controller.js";

const router = Router();

// TODO: Create new Trip
router.post("/", createTrip);

// TODO: Get all trips
router.get("/", getMyTrips);

// TODO: Get trip by members
router.get("/:tripId", getTripById);

// TODO: Update Trip details
router.patch("/:tripId", updateTrip);

// TODO: Delete Trip
router.delete("/:tripId", deleteTrip);

export default router;