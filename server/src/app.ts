import express from "express";
import type { Request, Response } from "express";
import router from "./routes.js";

import { errorHandler } from "./middleware/error.js";
import { apiLimiter } from "./middleware/rateLimit.js";

const app = express();

app.use(express.json());
app.use(apiLimiter);
app.use(router);
app.use(errorHandler);

app.get("/api", (req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome to RoadTrip Sync :) !!!" });
});

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

export default app;
