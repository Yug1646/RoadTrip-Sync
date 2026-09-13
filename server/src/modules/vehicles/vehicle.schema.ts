import { z } from "zod";

export const updateVehicleSchema = z.object({
  type: z.enum(["car", "motorcycle", "public_transport", "walk", "other"]),
});
