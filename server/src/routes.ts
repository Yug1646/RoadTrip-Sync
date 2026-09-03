import { Router } from "express";

import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/users/user.routes.js";
import tripRoutes from "./modules/trips/trip.routes.js";
import memberRoutes from "./modules/members/member.routes.js";
import locationRoutes from "./modules/locations/location.routes.js";
import vehicleRoutes from "./modules/vehicles/vehicle.routes.js";

const router = Router();

router.use("/api/auth", authRoutes);
router.use("/api/users", userRoutes);
router.use("/api/trips", tripRoutes);
router.use("/api/trips", vehicleRoutes);
router.use("/api/trips", memberRoutes);
router.use("/api/trips", locationRoutes);

export default router;
