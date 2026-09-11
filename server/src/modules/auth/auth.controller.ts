import { Request, Response } from "express";
import { authenticateUser, createUser } from "./auth.service.js";
import { loginSchema, registerSchema } from "./auth.schema.js";
import { signToken } from "../../utils/jwt.js";

// TODO: Register new user
export const registerUser = async (req: Request, res: Response) => {
  const data = registerSchema.parse(req.body);
  const result = await createUser(data.username, data.email, data.password);
  res.status(201).json(result);
};

// TODO: Login user
export const loginUser = async (req: Request, res: Response) => {
  const data = loginSchema.parse(req.body);
  const user = await authenticateUser(data.email, data.password);
  const token = signToken(user.userId);
  res.status(200).json({ token, user });
};