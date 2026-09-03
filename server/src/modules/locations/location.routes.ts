import { Router } from "express";

const router = Router();

// TODO: Update current location
router.put("/:tripId/location")

// TODO: All members location
router.get("/:tripId/locations")

export default router