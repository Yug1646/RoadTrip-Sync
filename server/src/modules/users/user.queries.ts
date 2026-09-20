import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { users } from "../../db/schema.js";

//? Find User By Email
export const findUserByEmail = async (email: string) => {
  const [user] = await db.select().from(users).where(eq(users.email, email));
  return user ?? null;
};

//? Find User By Username
export const findUserByUsername = async (username: string) => {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.username, username));
  return user ?? null;
};

//? Find User By Id
export const findUserById = async (userId: number) => {
  const [user] = await db.select().from(users).where(eq(users.id, userId));
  return user ?? null;
};
