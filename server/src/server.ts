import "dotenv/config";
import { createServer } from "node:http";
import app from "./app.js";
import { env } from "./config/env.js";
import { initSocketServer } from "./sockets/socket.server.js";

const httpServer = createServer(app);
initSocketServer(httpServer);

httpServer.listen(env.PORT, () => {
  console.log(`Server is running on port: ${env.PORT}`);
});
