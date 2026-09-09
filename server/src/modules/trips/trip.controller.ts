import { Request, Response } from "express";
import * as tripService from "./trip.service.js";
import { createTripSchema } from "./trip.schema.js";
import { AppError } from "../../utils/AppError.js";
// TODO: Create Trip
export const createTrip = async (req: Request, res: Response) => {
  const data = createTripSchema.parse(req.body);
  const userId = req.user!.userId;
  const trip = await tripService.createTrip(data.name, userId);
  return res.status(201).json(trip);
};

// TODO: Get trips
export const getMyTrips = async (req: Request, res: Response) => {
  const trips = await tripService.getTripsForUser(req.user!.userId);
  return res.status(200).json(trips);
};

// TODO: Get trip by id
export const getTripById = async (req: Request, res: Response) => {
  const tripId = Number(req.params.tripId);
  if (!Number.isInteger(tripId) || tripId <= 0) {
    throw new AppError(400, "Invalid trip id");
  }
  const trip = await tripService.getTripById(tripId, req.user!.userId);
  return res.status(200).json(trip);
};

// TODO: Update Trip
export const updateTrip = async (req: Request, res: Response) => {
  const tripId = Number(req.params.tripId);
  const data = req.body;
  if (!Number.isInteger(tripId) || tripId <= 0) {
    throw new AppError(400, "Invalid trip id");
  }
  const updateTripDetails = await tripService.updateTrip(
    tripId,
    req.user!.userId,
    data,
  );
  return res.status(200).json(updateTripDetails);
};

// TODO: Delete trip
export const deleteTrip = async (req: Request, res: Response) => {
  const tripId = Number(req.params.tripId);
  if (!Number.isInteger(tripId) || tripId <= 0) {
    throw new AppError(400, "Invalid trip id");
  }
  await tripService.deleteTrip(tripId, req.user!.userId);
  return res.sendStatus(200);
};
