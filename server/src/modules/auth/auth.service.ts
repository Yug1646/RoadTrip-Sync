import { db } from "../../db/index.js";
import { users } from "../../db/schema.js";
import { eq } from "drizzle-orm";
import { AppError } from "../../utils/AppError.js";
import { comparePassword, hashPassword } from "../../utils/passwords.js";
import { toUserResponse } from "../../dto/user.dto.js";

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
    .values({ username, email, passwordHash: passwordHash })
    .returning();
  return toUserResponse(created);
};

//? Authenticate user
export const authenticateUser = async (email: string, password: string) => {
  const findUser = await db.select().from(users).where(eq(users.email, email));
  if (findUser.length === 0) {
    throw new AppError(401, "Invalid credentials");
  }
  const [user] = findUser;
  const passwordIsValid = await comparePassword(password, user.passwordHash);
  if (!passwordIsValid) {
    throw new AppError(401, "Invalid credentials");
  }
  return toUserResponse(user);
};

//? Get user by id
export const getUserById = async (userId: number) => {
  const findUser = await db.select().from(users).where(eq(users.id, userId));

  if (findUser.length === 0) {
    throw new AppError(404, "User not found");
  }
  return toUserResponse(findUser[0]);
};
