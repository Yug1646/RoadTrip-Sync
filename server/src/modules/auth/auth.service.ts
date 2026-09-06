import { db } from "../../db/index.js";
import { users } from "../../db/schema.js";

import { eq } from "drizzle-orm";
import { AppError } from "../../utils/AppError.js";
import { hashPassword } from "../../utils/passwords.js";

//? Create new user
export const createUser = async (
  username: string,
  email: string,
  password: string,
) => {
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email));
  if (existingUser.length > 0) {
    throw new AppError(409, "Email already regiestered");
  }
  const passwordHash = await hashPassword(password);
  const [created] = await db
    .insert(users)
    .values({ username, email, passwordHash: passwordHash }).returning();
  return created;
};

//? Authenticate user
export const authenticateUser = async () => {};

//? Get user by id
export const getUserById = async () => {};
