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

  socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
    // ✅ Backend "Authorization" HTTP header theke token pore (Postman e confirm kora),
    // tai extraHeaders e "Authorization" pathano hocche.
    extraHeaders: {
      Authorization: token,
    },
    // 🔴 Important: Browser er native WebSocket API custom header pathate pare na.
    // extraHeaders SHUDHU "polling" transport e kaj kore. Tai amra "websocket"
    // e upgrade hote dicchi na, sudhu "polling" e lock kore rakhchi -
    // nahole 1st connect e header jabe, kintu websocket e upgrade hoyar por
    // header chole jabe, backend token na peye connection drop/error dite pare.
    transports: ["polling"],
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
    timeout: 20000,
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
