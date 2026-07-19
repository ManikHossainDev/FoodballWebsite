/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { baseApi } from "@/redux/api/baseApi";

export const MyOrders = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getConsultation: builder.query<
      any,
      { page?: number; limit?: number; status: string } | void
    >({
      query: (args) => ({
        url: "/player-consultation",
        method: "GET",
        params: {
          page: args?.page ?? 1,
          limit: args?.limit ?? 10,
          status: args?.status,
        },
      }),
      providesTags: ["MyOrders"],
    }),

    getVideoRequest: builder.query<
      any,
      { page?: number; limit?: number; status: string } | void
    >({
      query: (args) => ({
        url: "/player-video-request", // TODO: confirm this matches your backend route
        method: "GET",
        params: {
          page: args?.page ?? 1,
          limit: args?.limit ?? 10,
          status: args?.status,
        },
      }),
      providesTags: ["MyOrders"],
    }),

    addRateReviewVideo: builder.mutation<any, { id: string; data: any }>({
      query: ({ data, id }) => ({
        url: `/player-video-request/${id}/review`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["MyOrders"],
    }),

    addRateReviewConsultation: builder.mutation<any, { id: string; data: any }>(
      {
        query: ({ data, id }) => ({
          url: `/player-consultation/${id}/review`,
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["MyOrders"],
      },
    ),
  }),
});

export const {
  useGetConsultationQuery,
  useGetVideoRequestQuery,
  useAddRateReviewVideoMutation,
  useAddRateReviewConsultationMutation,
} = MyOrders;
