import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { generateJoinCode } from "../../utils/joinCode.js";
import { trips, vehicles } from "../../db/schema.js";
import { toTripResponse } from "../../dto/trip.dto.js";
import { AppError } from "../../utils/AppError.js";
import type { CreateTripInput, UpdateTripInput } from "./trip.schema.js";

//? Create trip
export const createTrip = async (data: CreateTripInput, createdBy: number) => {
  const joinCode = generateJoinCode();
  null;
};

//? Join Code
export const joinTrip = async () => {
  null;
};

//? List trips for user
export const getTripsForUser = async (createdBy: number) => {
  const findTrips = await db
    .select()
    .from(trips)
    .where(eq(trips.createdBy, createdBy));
  return findTrips.map(toTripResponse);
};

//? Find trip by id
export const getTripById = async (tripId: number, userId: number) => {
  const findTrip = await db.select().from(trips).where(eq(trips.id, tripId));
  if (findTrip.length === 0) {
    throw new AppError(404, "No trip found");
  }
  return findTrip.map(toTripResponse);
};

//? Update trip
//! Note: Only the trip leader can update
export const updateTrip = async (
  tripId: number,
  userId: number,
  data: UpdateTripInput,
) => {
  await getTripById(tripId, userId);
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
  if (trip.status === "active") {
    throw new AppError(
      409,
      "Active trips cannot be deleted. Complete the trip first.",
    );
  }
  await db.delete(trips).where(eq(trips.id, tripId));
};
