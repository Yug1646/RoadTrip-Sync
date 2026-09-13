import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { vehicles } from "../../db/schema.js";
import * as tripService from "../trips/trip.service.js";
import { toVehicleResponse } from "../../dto/vehicle.dto.js";
import { AppError } from "../../utils/AppError.js";

//? List vehicles by trip
export const listVehiclesByTrip = async (tripId: number, userId: number) => {
  await tripService.getTripById(tripId, userId);
  const rows = await db
    .select()
    .from(vehicles)
    .where(eq(vehicles.tripId, tripId));
  return rows.map(toVehicleResponse);
};

//? Update vehicle (driver-only)
export const updateVehicle = async (
  vehicleId: number,
  userId: number,
  type: string,
) => {
  const [vehicle] = await db
    .select()
    .from(vehicles)
    .where(eq(vehicles.id, vehicleId));
  if (!vehicle || vehicle.driverId !== userId) {
    throw new AppError(404, "Vehicle not found");
  }
  const [updated] = await db
    .update(vehicles)
    .set({ type })
    .where(eq(vehicles.id, vehicleId))
    .returning();
  return toVehicleResponse(updated);
};

//? Delete vehicle (driver-only, blocked while trip is active)
export const deleteVehicle = async (vehicleId: number, userId: number) => {
  const [vehicle] = await db
    .select()
    .from(vehicles)
    .where(eq(vehicles.id, vehicleId));
  if (!vehicleId || vehicle.driverId !== userId) {
    throw new AppError(404, "Vehicle not found ");
  }
  const trip = await tripService.getTripById(vehicle.tripId, userId);
  if (trip.status === "active") {
    throw new AppError(
      409,
      "Vehicle cannot be deleted as trip status is active",
    );
  }
  await db.delete(vehicles).where(eq(vehicles.id, vehicleId));
};
