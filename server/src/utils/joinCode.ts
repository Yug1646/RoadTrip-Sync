import { randomBytes } from "crypto";

export const generateJoinCode = () => {
  return randomBytes(4).toString("hex").toUpperCase();
};
