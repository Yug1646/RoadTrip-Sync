import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

import { env } from "../config/env.js";
import { AppError } from "../utils/AppError.js";

export const authMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new AppError(401, "No token provided");
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as {
      userId: number;
    };
    req.user = decoded;
    next();
  } catch (error) {
    throw new AppError(401, "Invalid or expired token");
  }
};
