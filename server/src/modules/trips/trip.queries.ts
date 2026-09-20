import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { trips } from "../../db/schema.js";

//? Find Trip by id
export const findTripById = async (tripId: number) => {
  const [trip] = await db.select().from(trips).where(eq(trips.id, tripId));
  return trip ?? null;
};
