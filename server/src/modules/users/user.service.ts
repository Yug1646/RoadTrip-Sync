import { eq, and, ne } from "drizzle-orm";
import { db } from "../../db/index.js";
import { users } from "../../db/schema.js";
import { AppError } from "../../utils/AppError.js";
import { toUserProfileResponse, toUserResponse } from "../../dto/user.dto.js";
import type { UpdateProfileInput } from "./user.schema.js";

//? Get user details by id
export const getUserDetailsById = async (userId: number) => {
  const findUser = await db.select().from(users).where(eq(users.id, userId));
  if (findUser.length === 0) {
    throw new AppError(404, "User not found");
  }
  return toUserProfileResponse(findUser[0]);
};

//? Update user
export const updateUser = async (userId: number, data: UpdateProfileInput) => {
  const [existing] = await db.select().from(users).where(eq(users.id, userId));
  if (!existing) {
    throw new AppError(404, "User not found");
  }

  if (data.username && data.username !== existing.username) {
    const [usernameClash] = await db
      .select()
      .from(users)
      .where(and(eq(users.username, data.username), ne(users.id, userId)));
    if (usernameClash) {
      throw new AppError(409, "Username already taken");
    }
  }

  if (data.email && data.email !== existing.email) {
    const [emailClash] = await db
      .select()
      .from(users)
      .where(and(eq(users.email, data.email), ne(users.id, userId)));
    if (emailClash) {
      throw new AppError(409, "Email already registered");
    }
  }

  const [updated] = await db
    .update(users)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(users.id, userId))
    .returning();

  return toUserResponse(updated);
};
