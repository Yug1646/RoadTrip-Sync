import { Request, Response } from "express";
import { AppError } from "../../utils/AppError.js";
import * as vehicleService from "./vehicle.service.js";

// TODO: Add vehicle
export const addVehicleToTrip = async (req: Request, res: Response) => {};

// TODO: Get trip vehicles
export const getTripVehicles = async (req: Request, res: Response) => {
  const tripId = Number(req.params.tripId);
  if (!Number.isInteger(tripId) || tripId <= 0) {
    throw new AppError(400, "Invalid trip id");
  }
  const vehicle = await vehicleService.listVehiclesByTrip(tripId);
  return res.status(200).json(vehicle);
};

// TODO: Update vehicle
export const updateVehicle = async (req: Request, res: Response) => {};

// TODO: Delete vehicle
export const deleteVehicle = async (req: Request, res: Response) => {
  const vehicleId = Number(req.params.vehicleId);
  //! I think we should add a condition if the trip is in active state or not, if true than vehicle can't be delete
  if (!Number.isInteger(vehicleId) || vehicleId <= 0) {
    throw new AppError(400, "Invalid Vehicle Id");
  }
  await vehicleService.deleteVehicle(vehicleId);
  return res.sendStatus(200);
};
