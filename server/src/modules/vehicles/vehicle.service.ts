import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { vehicles } from "../../db/schema.js";
import * as tripService from "../trips/trip.service.js";
import { toVehicleResponse } from "../../dto/vehicle.dto.js";
import { AppError } from "../../utils/AppError.js";
import { findVehicleById } from "./vehicle.queries.js";
import type { UpdateVehicleInput } from "./vehicle.schema.js";

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
  data: UpdateVehicleInput,
) => {
  const vehicle = await findVehicleById(vehicleId);
  if (!vehicle || vehicle.driverId !== userId) {
    throw new AppError(404, "Vehicle not found");
  }
  const trip = await tripService.getTripById(vehicle.tripId, userId);
  if (trip.status === "completed") {
    throw new AppError(
      409,
      "Trip is completed. Vehicle mode can no longer be changed.",
    );
  }
  const [updated] = await db
    .update(vehicles)
    .set({ type: data.type })
    .where(eq(vehicles.id, vehicleId))
    .returning();
  return toVehicleResponse(updated);
};

//? Delete vehicle (driver-only, blocked while trip is active)
export const deleteVehicle = async (vehicleId: number, userId: number) => {
  const vehicle = await findVehicleById(vehicleId);
  if (!vehicle || vehicle.driverId !== userId) {
    throw new AppError(404, "Vehicle not found");
  }
  const trip = await tripService.getTripById(vehicle.tripId, userId);
  if (trip.createdBy === userId) {
    throw new AppError(
      409,
      "Creators cannot delete their own unit. Delete the trip instead.",
    );
  }
  if (trip.status === "active") {
    throw new AppError(
      409,
      "Vehicle cannot be deleted as trip status is active",
    );
  }
  await db.delete(vehicles).where(eq(vehicles.id, vehicleId));
};
