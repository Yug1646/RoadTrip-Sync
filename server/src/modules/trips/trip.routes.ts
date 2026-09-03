import { Router } from "express";

const router = Router();

// TODO: Create new Trip
router.post("/");

// TODO: Get all trips
router.get("/");

// TODO: Get trip by members
router.get("/:tripId");

// TODO: Update Trip details
router.patch("/:tripId");

// TODO: Delete Trip
router.delete("/:tripId");

export default router;
