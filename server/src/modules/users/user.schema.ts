import { z } from "zod";

export const updateProfileSchema = z
  .object({
    username: z.string().min(3).max(50).optional(),
    email: z.email().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  });

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
