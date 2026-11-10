import { z } from "zod";

export const registerSchema = z.object({
  email: z.email().transform((v) => v.toLowerCase()),
  username: z.string().min(3).max(50),
  password: z.string().min(8),
});

export const loginSchema = z.object({
  email: z.email().transform((v) => v.toLowerCase()),
  password: z.string().min(1),
});