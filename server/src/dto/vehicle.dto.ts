import type { vehicles } from "../db/schema.js";

export const toVehicleResponse = (v: typeof vehicles.$inferSelect) => ({
  vehicleId: v.id,
  tripId: v.tripId,
  type: v.type,
  driverId: v.driverId,
});
