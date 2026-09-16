import type { Request, Response } from "express";
import {
  listVehicleLocations,
  upsertVehicleLocation,
} from "./location.service.js";
import { upsertLocationSchema } from "./location.schema.js";
import { parseIdParam } from "../../utils/params.js";

//? Update vehicle location (driver's own unit)
export const updateVehicleLocation = async (req: Request, res: Response) => {
  const tripId = parseIdParam(req.params.tripId, "trip id");
  const coords = upsertLocationSchema.parse(req.body);
  const location = await upsertVehicleLocation(
    tripId,
    req.user!.userId,
    coords,
  );
  return res.status(200).json(location);
};

//? Get trip locations (map data)
export const getTripLocation = async (req: Request, res: Response) => {
  const tripId = parseIdParam(req.params.tripId, "trip id");
  const locations = await listVehicleLocations(tripId, req.user!.userId);
  return res.status(200).json(locations);
};
