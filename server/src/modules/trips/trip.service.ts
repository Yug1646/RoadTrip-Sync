import { and, eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { generateJoinCode } from "../../utils/joinCode.js";
import { trips, vehicles } from "../../db/schema.js";
import { toTripResponse } from "../../dto/trip.dto.js";
import { AppError } from "../../utils/AppError.js";
import type {
  CreateTripInput,
  JoinTripInput,
  UpdateTripInput,
} from "./trip.schema.js";
import { toVehicleResponse } from "../../dto/vehicle.dto.js";

//? Create trip
export const createTrip = async (data: CreateTripInput, createdBy: number) => {
  const joinCode = generateJoinCode();
  return db.transaction(async (tx) => {
    const [trip] = await tx
      .insert(trips)
      .values({
        name: data.name,
        startLocation: data.startLocation,
        endLocation: data.endLocation,
        joinCode,
        createdBy,
        status: "planned",
      })
      .returning();
    const [vehicle] = await tx
      .insert(vehicles)
      .values({
        tripId: trip.id,
        driverId: createdBy,
        type: data.type,
      })
      .returning();
    return {
      ...toTripResponse(trip),
      joinCode,
      startLocation: trip.startLocation,
      endLocation: trip.endLocation,
      vehicle: toVehicleResponse(vehicle),
    };
  });
};

//? Join Code
export const joinTrip = async (data: JoinTripInput, userId: number) => {
  const [trip] = await db
    .select()
    .from(trips)
    .where(eq(trips.joinCode, data.joinCode));
  if (!trip) {
    throw new AppError(404, "Invalid join code");
  }
  const [alreadyJoined] = await db
    .select()
    .from(vehicles)
    .where(and(eq(vehicles.tripId, trip.id), eq(vehicles.driverId, userId)));

  if (alreadyJoined) {
    throw new AppError(409, "You have already joined this trip");
  }
  const [vehicle] = await db
    .insert(vehicles)
    .values({ tripId: trip.id, driverId: userId, type: data.type })
    .returning();

  return {
    trip: toTripResponse(trip),
    vehicle: toVehicleResponse(vehicle),
  };
};

//? List trips for user
export const getTripsForUser = async (userId: number) => {
  const rows = await db
    .select({ trip: trips })
    .from(trips)
    .innerJoin(vehicles, eq(vehicles.tripId, trips.id))
    .where(eq(vehicles.driverId, userId));
  return rows.map((row) => toTripResponse(row.trip));
};

//? Find trip by id
export const getTripById = async (tripId: number, userId: number) => {
  const [trip] = await db.select().from(trips).where(eq(trips.id, tripId));
  if (!trip) {
    throw new AppError(404, "No trip found");
  }
  const [membership] = await db
    .select()
    .from(vehicles)
    .where(and(eq(vehicles.tripId, tripId), eq(vehicles.driverId, userId)));
  if (!membership) {
    throw new AppError(404, "Trip not found");
  }
  return toTripResponse(trip);
};

//? Update trip
//! Note: Only the trip leader can update
export const updateTrip = async (
  tripId: number,
  userId: number,
  data: UpdateTripInput,
) => {
  const [trip] = await db.select().from(trips).where(eq(trips.id, tripId));
  if (!trip || trip.createdBy !== userId) {
    throw new AppError(404, "Trip not found");
  }
  const [updated] = await db
    .update(trips)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(trips.id, tripId))
    .returning();
  return toTripResponse(updated);
};

//? Delete trip
//! Note: Only trip creater can delete
export const deleteTrip = async (tripId: number, userId: number) => {
  const [trip] = await db.select().from(trips).where(eq(trips.id, tripId));
  if (!trip || trip.createdBy !== userId) {
    throw new AppError(404, "Trip not found");
  }
  if (trip.status === "active") {
    throw new AppError(
      409,
      "Active trips cannot be deleted. Complete the trip first.",
    );
  }
  await db.delete(trips).where(eq(trips.id, tripId));
};
