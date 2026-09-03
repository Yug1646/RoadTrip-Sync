import { Router } from "express";

const router = Router();

// TODO: Add vehicle
router.post("/:tripId/vehicles");

// TODO: List trip's vehicle
router.get("/:tripId/vehicles");

// TODO: Rename Vehicle
router.patch("/:tripId/vehicles/:vehicleId");

// TODO: Delete Vehicle
router.delete("/:tripId/vehicles/:vehicleId");

export default router;
