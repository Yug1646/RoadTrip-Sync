import { Request, Response } from "express";
import { AppError } from "../../utils/AppError.js";
import * as vehicleService from "./vehicle.service.js";
import { updateVehicleSchema } from "./vehicle.schema.js";

// TODO: Get trip vehicles
export const getTripVehicles = async (req: Request, res: Response) => {
  const tripId = Number(req.params.tripId);
  if (!Number.isInteger(tripId) || tripId <= 0) {
    throw new AppError(400, "Invalid trip id");
  }
  const vehicle = await vehicleService.listVehiclesByTrip(
    tripId,
    req.user!.userId,
  );
  return res.status(200).json(vehicle);
};

// TODO: Update vehicle
export const updateVehicle = async (req: Request, res: Response) => {
  const vehicleId = Number(req.params.vehicleId);
  if (!Number.isInteger(vehicleId) || vehicleId <= 0) {
    throw new AppError(400, "Invalid vehicle id");
  }
  const data = updateVehicleSchema.parse(req.body);
  const vehicle = await vehicleService.updateVehicle(
    vehicleId,
    req.user!.userId,
    data.type,
  );
  return res.status(200).json(vehicle);
};

// TODO: Delete vehicle
export const deleteVehicle = async (req: Request, res: Response) => {
  const vehicleId = Number(req.params.vehicleId);
  if (!Number.isInteger(vehicleId) || vehicleId <= 0) {
    throw new AppError(400, "Invalid vehicle id");
  }
  await vehicleService.deleteVehicle(vehicleId, req.user!.userId);
  return res.sendStatus(204);
};
