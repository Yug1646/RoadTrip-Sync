import { Request, Response } from "express";
import * as tripService from "./trip.service.js";
import {
  createTripSchema,
  joinTripSchema,
  updateTripSchema,
} from "./trip.schema.js";
import { parseIdParam } from "../../utils/params.js";

//? Create Trip
export const createTrip = async (req: Request, res: Response) => {
  const data = createTripSchema.parse(req.body);
  const trip = await tripService.createTrip(data, req.user!.userId);
  return res.status(201).json(trip);
};

//? Join trip via code
export const joinTrip = async (req: Request, res: Response) => {
  const data = joinTripSchema.parse(req.body);
  const result = await tripService.joinTrip(data, req.user!.userId);
  return res.status(200).json(result);
};

//? Get trips
export const getMyTrips = async (req: Request, res: Response) => {
  const trips = await tripService.getTripsForUser(req.user!.userId);
  return res.status(200).json(trips);
};

//? Get trip by id
export const getTripById = async (req: Request, res: Response) => {
  const tripId = parseIdParam(req.params.tripId, "trip id");
  const trip = await tripService.getTripById(tripId, req.user!.userId);
  return res.status(200).json(trip);
};

//? Update Trip
export const updateTrip = async (req: Request, res: Response) => {
  const tripId = parseIdParam(req.params.tripId, "trip id");
  const data = updateTripSchema.parse(req.body);
  const updateTripDetails = await tripService.updateTrip(
    tripId,
    req.user!.userId,
    data,
  );
  return res.status(200).json(updateTripDetails);
};

//? Delete trip
export const deleteTrip = async (req: Request, res: Response) => {
  const tripId = parseIdParam(req.params.tripId, "trip id");
  await tripService.deleteTrip(tripId, req.user!.userId);
  return res.sendStatus(204);
};
