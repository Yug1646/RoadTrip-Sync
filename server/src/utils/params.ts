import { z } from "zod";
import { AppError } from "./AppError.js";

const idSchema = z.coerce.number().int().positive();

export const parseIdParam = (
  value: string | string[] | undefined,
  name = "id",
): number => {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = idSchema.safeParse(raw);
  if (!parsed.success) {
    throw new AppError(400, `Invalid ${name}`);
  }
  return parsed.data;
};
