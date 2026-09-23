// src/lib/socketInstance.ts
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const initSocket = (token: string): Socket => {
  if (socket?.connected) {
    return socket;
  }

  if (socket) {
    socket.disconnect();
  }

  const cleanToken = token?.replace(/['"]+/g, "").trim() || "";
  const authBearer = cleanToken.startsWith("Bearer ") ? cleanToken : `Bearer ${cleanToken}`;
  const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || "https://socket.evolutionclub.org";

  socket = io(socketUrl, {
    auth: {
      token: cleanToken,
      Authorization: authBearer,
    },
    extraHeaders: {
      Authorization: authBearer,
    },
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionDelay: 2000,
    reconnectionDelayMax: 10000,
    reconnectionAttempts: 3,
    timeout: 15000,
    forceNew: true,
  });

  return socket;
};

export const getSocket = (): Socket | null => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
