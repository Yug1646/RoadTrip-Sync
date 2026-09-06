import { Request, Response } from "express";
import { createUser } from "./auth.service.js";

// TODO: Register new user
export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const result = await createUser(username, email, password);
  res.status(201).json(result);
};

// TODO: Login User
export const loginUser = async (req: Request, res: Response) => {};

// TODO: Authenticate User
export const getAuthenticatedUser = async (req: Request, res: Response) => {};
