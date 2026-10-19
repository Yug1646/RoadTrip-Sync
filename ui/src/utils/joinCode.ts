const CODE_CHARSET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function generateJoinCode(length = 6): string {
  let code = "";
  for (let i = 0; i < length; i++) {
    code += CODE_CHARSET[Math.floor(Math.random() * CODE_CHARSET.length)];
  }
  return code;
}
