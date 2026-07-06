"use client";
import { baseApi } from "@/redux/api/baseApi";
const Profile = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    GetProfile: builder.query({
      query: () => ({
        url: "/user/self-profile",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),
    UpdateProfile: builder.mutation({
      query: (data) => ({
        url: "/user/update-profile",
        method: "PUT",
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
      query: () => ({
        url: "/notifications",
        method: "GET",
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
  useUpdateProfileMutation,
  useSupportMutation,
  useGetNotificationsQuery,
  useGetSettingsQuery,
  useGetDashboardMutation,
  useCosmicBlueprintMutation,
} = Profile;
