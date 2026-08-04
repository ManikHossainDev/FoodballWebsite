"use client";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { SocketProvider } from "@/context/SocketContext";

const ProviderContent = ({ children }: { children: ReactNode }) => {
  return <Provider store={store}><SocketProvider> {children}</SocketProvider></Provider>;
};

export default ProviderContent;