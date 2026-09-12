import { z } from "zod";

export const createTripSchema = z.object({
  name: z.string().min(1).max(255),
  startLocation: z.string().min(1).max(255),
  endLocation: z.string().min(1).max(255),
  type: z.enum(["car", "motorcycle", "public_transport", "walk", "other"]),
});

export const updateTripSchema = z
  .object({
    name: z.string().min(1).max(255).optional(),
    status: z.enum(["planned", "active", "completed"]).optional(),
    startLocation: z.string().min(1).max(255).optional(),
    endLocation: z.string().min(1).max(255).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  });

export const joinTripSchema = z.object({
  joinCode: z.string().min(6).max(10),
  type: z.enum(["car", "motorcycle", "public_transport", "walk", "other"]),
});

export type CreateTripInput = z.infer<typeof createTripSchema>;
export type UpdateTripInput = z.infer<typeof updateTripSchema>;
export type JoinTripInput = z.infer<typeof joinTripSchema>;
