import { Request, Response } from "express";
import { AppError } from "../../utils/AppError.js";
import {
  listVehicleLocations,
  upsertVehicleLocation,
} from "./location.service.js";
import { upsertLocationSchema } from "./location.schema.js";

// TODO: Update vehicle location
export const updateVehicleLocation = async (req: Request, res: Response) => {
  const tripId = Number(req.params.tripId);
  if (!Number.isInteger(tripId) || tripId <= 0) {
    throw new AppError(400, "Invalid trip id");
  }
  const coords = upsertLocationSchema.parse(req.body);
  const location = await upsertVehicleLocation(
    tripId,
    req.user!.userId,
    coords,
  );
  return res.status(200).json(location);
};

// TODO: Get trip location
export const getTripLocation = async (req: Request, res: Response) => {
  const tripId = Number(req.params.tripId);
  if (!Number.isInteger(tripId) || tripId <= 0) {
    throw new AppError(400, "Invalid trip id");
  }
  const locations = await listVehicleLocations(tripId, req.user!.userId);
  return res.status(200).json(locations);
};
