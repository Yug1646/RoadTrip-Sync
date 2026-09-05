import { Router } from "express";
import {
  getTripLocation,
  updateVehicleLocation,
} from "./location.controller.js";

const router = Router();

// TODO: Update current location
router.put("/:tripId/location", updateVehicleLocation);

// TODO: All members location
router.get("/:tripId/locations", getTripLocation);

export default router;