import { Router } from "express";

const router = Router();

// TODO: Add a user to trip
router.post("/:tripId/members");

// TODO: Get members
router.get("/:tripId/members");

// TODO: Change vehicle assignment
router.patch("/tripId/members/:memberId");

// TODO: Leave trip
router.delete("/tripId/members/:memberId");

export default router;
