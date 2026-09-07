import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const signToken = (userId: number) =>
  jwt.sign({ userId }, env.JWT_SECRET, { expiresIn: "1d" });
