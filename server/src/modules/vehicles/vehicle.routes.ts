import { Router } from "express";
import {
  deleteVehicle,
  getTripVehicles,
  updateVehicle,
} from "./vehicle.controller.js";
import { authMiddleware } from "../../middleware/auth.js";

const router = Router();

// TODO: List trip's vehicle
router.get("/:tripId/vehicles", authMiddleware, getTripVehicles);

// TODO: Rename Vehicle
router.patch("/:tripId/vehicles/:vehicleId", authMiddleware, updateVehicle);

// TODO: Delete Vehicle
router.delete("/:tripId/vehicles/:vehicleId", authMiddleware, deleteVehicle);

export default router;
