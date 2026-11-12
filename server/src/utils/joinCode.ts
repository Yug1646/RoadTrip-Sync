import { randomInt } from "crypto";

//? Excludes ambiguous characters (I, O, 0, 1) so codes are easy to read aloud
const CODE_CHARSET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export const generateJoinCode = () => {
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += CODE_CHARSET[randomInt(CODE_CHARSET.length)];
  }
  return code;
};
