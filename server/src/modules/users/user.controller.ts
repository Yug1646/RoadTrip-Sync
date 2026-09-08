import { Request, Response } from "express";
import { getUserDetailsById, updateUser } from "./user.service.js";
import { updateProfileSchema } from "./user.schema.js";

// TODO: Get user profile
export const getCurrentUserProfile = async (req: Request, res: Response) => {
  const result = await getUserDetailsById(req.user!.userId);
  return res.status(200).json(result);
};

// TODO: Update current user profile
export const updateCurrentUserProfile = async (req: Request, res: Response) => {
  const data = updateProfileSchema.parse(req.body);
  const user = await updateUser(req.user!.userId, data);
  res.status(200).json(user);
};
