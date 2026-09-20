import { and, eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { locations, vehicles } from "../../db/schema.js";
import * as tripService from "../trips/trip.service.js";
import { AppError } from "../../utils/AppError.js";
import { findUnitByTripAndDriver } from "../vehicles/vehicle.queries.js";

//? Upsert vehicle location (driver's own unit; one row per unit per trip)
export const upsertVehicleLocation = async (
  tripId: number,
  userId: number,
  coords: { latitude: number; longitude: number },
) => {
  await tripService.getTripById(tripId, userId);
  const unit = await findUnitByTripAndDriver(tripId, userId);
  if (!unit) {
    throw new AppError(404, "You have no vehicle in this trip");
  }
  await db
    .insert(locations)
    .values({ tripId, vehicleId: unit.id, ...coords })
    .onConflictDoUpdate({
      target: [locations.tripId, locations.vehicleId],
      set: { ...coords, updatedAt: new Date() },
    });
  return { ...coords, updatedAt: new Date() };
};

//? List trip units + their current positions (map data)
export const listVehicleLocations = async (tripId: number, userId: number) => {
  await tripService.getTripById(tripId, userId);
  const rows = await db
    .select({
      vehicleId: vehicles.id,
      type: vehicles.type,
      driverId: vehicles.driverId,
      latitude: locations.latitude,
      longitude: locations.longitude,
      updatedAt: locations.updatedAt,
    })
    .from(vehicles)
    .leftJoin(
      locations,
      and(eq(locations.vehicleId, vehicles.id), eq(locations.tripId, tripId)),
    )
    .where(eq(vehicles.tripId, tripId));
  return rows;
};
