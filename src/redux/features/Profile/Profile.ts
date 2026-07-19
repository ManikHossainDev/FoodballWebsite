"use client";
import { baseApi } from "@/redux/api/baseApi";
const Profile = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    GetProfile: builder.query({
      query: () => ({
        url: "/users/self/profile",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),
    GetUserProfile: builder.query({
      query: (id) => ({
        url: `users/profile/${id}`,
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),
    UpdateProfile: builder.mutation({
      query: (data) => ({
        url: "/users/self/update",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
    UpdateProfileImage: builder.mutation({
      query: (data) => ({
        url: "/users/self/image",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
    support: builder.mutation({
      query: (data) => ({
        url: "/support",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
    getNotifications: builder.query({
      query: ({
        page,
        limit,
        role,
      }: {
        page?: number;
        limit?: number;
        role: "player" | "coach" | "agent" | "club";
      }) => ({
        url: "/users/all",
        method: "GET",
        params: {
          page,
          limit,
          role,
        },
      }),
      providesTags: ["Profile"],
    }),
    getSettings: builder.query({
      query: (params) => ({
        url: `/settings/${params}`,
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),
    getDashboard: builder.mutation({
      query: (data) => ({
        url: `/sign-prediction-daily`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
    cosmicBlueprint: builder.mutation({
      query: (data) => ({
        url: "/cosmic-blueprint",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useGetUserProfileQuery,
  useUpdateProfileMutation,
  useUpdateProfileImageMutation,
  useSupportMutation,
  useGetNotificationsQuery,
  useGetSettingsQuery,
  useGetDashboardMutation,
  useCosmicBlueprintMutation,
} = Profile;
