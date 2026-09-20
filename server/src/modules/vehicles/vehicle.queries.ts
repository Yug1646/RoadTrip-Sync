import { and, eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { vehicles } from "../../db/schema.js";

//? Find Vehicle by id
export const findVehicleById = async (vehicleId: number) => {
  const [vehicle] = await db
    .select()
    .from(vehicles)
    .where(eq(vehicles.id, vehicleId));
  return vehicle ?? null;
};

//? Find unit by trip and driver
export const findUnitByTripAndDriver = async (
  tripId: number,
  driverId: number,
) => {
  const [tripUnit] = await db
    .select()
    .from(vehicles)
    .where(and(eq(vehicles.tripId, tripId), eq(vehicles.driverId, driverId)));

  return tripUnit ?? null;
};
