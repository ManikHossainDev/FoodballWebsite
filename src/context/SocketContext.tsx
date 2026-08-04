// src/context/SocketContext.tsx
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { useSelector } from "react-redux";
import { selectToken } from "@/redux/features/auth/authSlice";
import { initSocket, disconnectSocket, getSocket } from "@/lib/socketInstance";
import { Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket | null;
  connected: boolean;
  error: string | null;
  connect: () => void;
  disconnect: () => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [connected, setConnected] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const token = useSelector(selectToken);

  const connect = useCallback(() => {
    if (!token) {
      setError("No authentication token available");
      return;
    }

    try {
      const socketInstance = initSocket(token);

      const handleConnect = () => {
        console.log("✅ [SocketContext] Socket connected");
        setConnected(true);
        setError(null);
      };

      const handleDisconnect = () => {
        console.log("❌ [SocketContext] Socket disconnected");
        setConnected(false);
      };

      const handleError = (err: Error) => {
        console.error("🔴 [SocketContext] Socket error:", err.message);
        setError(err.message);
        setConnected(false);
      };

      socketInstance.on("connect", handleConnect);
      socketInstance.on("disconnect", handleDisconnect);
      socketInstance.on("connect_error", handleError);

      // Set initial state
      if (socketInstance.connected) {
        setConnected(true);
      }

      // Cleanup on reconnect or unmount
      return () => {
        socketInstance.off("connect", handleConnect);
        socketInstance.off("disconnect", handleDisconnect);
        socketInstance.off("connect_error", handleError);
      };
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unknown error initializing socket"
      );
    }
  }, [token]);

  const disconnect = useCallback(() => {
    disconnectSocket();
    setConnected(false);
    setError(null);
  }, []);

  // Auto connect/disconnect based on token
  useEffect(() => {
    if (token) {
      const cleanup = connect();
      return cleanup;
    } else {
      disconnect();
    }
  }, [token, connect, disconnect]);

  const value = {
    socket: getSocket(),
    connected,
    error,
    connect,
    disconnect,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

// Custom hook to use socket anywhere
export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within SocketProvider");
  }
  return context;
};