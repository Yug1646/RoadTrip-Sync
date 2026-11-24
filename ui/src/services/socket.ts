import { io } from "socket.io-client";
import { getToken } from "./token";

const SOCKET_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:8080";

export const socket = io(SOCKET_URL, { autoConnect: false });

export function connectSocket() {
  socket.auth = { token: getToken() };
  socket.connect();
}

export function disconnectSocket() {
  socket.disconnect();
}
