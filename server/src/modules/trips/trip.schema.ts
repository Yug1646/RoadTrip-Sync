import { z } from "zod";

export const createTripSchema = z.object({
  name: z.string().min(1).max(255),
});

export const updateTripSchema = z
  .object({
    name: z.string().min(1).max(255).optional(),
    status: z.enum(["planned", "active", "completed"]).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  });

export type UpdateTripInput = z.infer<typeof updateTripSchema>;
