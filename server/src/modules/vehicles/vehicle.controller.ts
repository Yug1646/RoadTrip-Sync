import { Request, Response } from "express";
import * as vehicleService from "./vehicle.service.js";
import { updateVehicleSchema } from "./vehicle.schema.js";
import { parseIdParam } from "../../utils/params.js";

//? Get trip vehicles
export const getTripVehicles = async (req: Request, res: Response) => {
  const tripId = parseIdParam(req.params.tripId, "trip id");
  const vehicle = await vehicleService.listVehiclesByTrip(
    tripId,
    req.user!.userId,
  );
  return res.status(200).json(vehicle);
};

//? Update vehicle (driver-only)
export const updateVehicle = async (req: Request, res: Response) => {
  const vehicleId = parseIdParam(req.params.vehicleId, "vehicle id");
  const data = updateVehicleSchema.parse(req.body);
  const vehicle = await vehicleService.updateVehicle(
    vehicleId,
    req.user!.userId,
    data.type,
  );
  return res.status(200).json(vehicle);
};

//? Delete vehicle (driver-only; blocked while trip is active)
export const deleteVehicle = async (req: Request, res: Response) => {
  const vehicleId = parseIdParam(req.params.vehicleId, "vehicle id");
  await vehicleService.deleteVehicle(vehicleId, req.user!.userId);
  return res.sendStatus(204);
};
