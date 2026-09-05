import { Router } from "express";
import {
  addVehicleToTrip,
  deleteVehicle,
  getTripVehicles,
  updateVehicle,
} from "./vehicle.controller.js";

const router = Router();

// TODO: Add vehicle
router.post("/:tripId/vehicles", addVehicleToTrip);

// TODO: List trip's vehicle
router.get("/:tripId/vehicles", getTripVehicles);

// TODO: Rename Vehicle
router.patch("/:tripId/vehicles/:vehicleId", updateVehicle);

// TODO: Delete Vehicle
router.delete("/:tripId/vehicles/:vehicleId", deleteVehicle);

export default router;
