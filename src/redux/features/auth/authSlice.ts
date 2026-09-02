/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import {
  getFromCookies,
  setToCookies,
  removeFromCookies,
} from "@/utils/cookies-storage";

export type TUser = {
  name: string;
  email: string;
  password: string;
  _id?: string;
  id: string;
};

// Define the type for the auth state
type TAuthState = {
  user: TUser | null;
  token: string | null;
  socketConnection: any;
  onlineUser: string[];
  isAuthModalOpen: boolean;
  authModalTab: "signin" | "signup";
};

// Initialize state from cookies if available
const getUserFromCookies = () => {
  const userCookie = getFromCookies("user");
  return userCookie ? JSON.parse(userCookie) : null;
};

const getTokenFromCookies = () => {
  return getFromCookies("token");
};

const initialState: TAuthState = {
  user: getUserFromCookies(),
  token: getTokenFromCookies(),
  socketConnection: null,
  onlineUser: [],
  isAuthModalOpen: false,
  authModalTab: "signin",
};

// Create the slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;

      // Store user and token in cookies
      if (user) {
        setToCookies("user", JSON.stringify(user));
      }
      if (token) {
        setToCookies("token", token);
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.socketConnection = null;
      // Remove from cookies
      removeFromCookies("user");
      removeFromCookies("token");
    },
    setSocketConnection: (state, action) => {
      state.socketConnection = action.payload;
    },
    setOnlineUser: (state, action) => {
      state.onlineUser = action.payload;
    },
    openAuthModal: (
      state,
      action: PayloadAction<"signin" | "signup" | undefined>
    ) => {
      state.isAuthModalOpen = true;
      if (action.payload) {
        state.authModalTab = action.payload;
      }
    },
    closeAuthModal: (state) => {
      state.isAuthModalOpen = false;
    },
  },
});

export const {
  setUser,
  logout,
  setSocketConnection,
  setOnlineUser,
  openAuthModal,
  closeAuthModal,
} = authSlice.actions;
export default authSlice.reducer;
// Selector to get the current user state
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;
export const selectOnlineUsers = (state: RootState) => state.auth.onlineUser;
export const selectSocketConnection = (state: RootState) =>
  state.auth.socketConnection;
export const selectIsAuthModalOpen = (state: RootState) =>
  state.auth.isAuthModalOpen;
export const selectAuthModalTab = (state: RootState) =>
  state.auth.authModalTab;
