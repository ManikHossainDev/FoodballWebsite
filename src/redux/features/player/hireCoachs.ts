/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { baseApi } from "@/redux/api/baseApi";
export const HireCoachs = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getCoaches: builder.query<any, { page?: number; limit?: number } | void>({
      query: (args) => ({
        url: "/users/coaches",
        method: "GET",
        params: {
          page: args?.page ?? 1,
          limit: args?.limit ?? 10,
        },
      }),
      providesTags: ["coaches"],
    }),
    getSingleCoaches: builder.query({
      query: (id) => ({
        url: `/users/coaches/${id}`,
        method: "GET",
      }),
      providesTags: ["coaches"],
    }),
    getReviewsForAUser: builder.query({
      query: (id) => ({
        url: `/ratings/${id}`,
        method: "GET",
      }),
      providesTags: ["coaches"],
    }),
   
    addVideoRequests: builder.mutation({
      query: (data) => ({
        url: "/player-video-request",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["coaches"],
    }),
    updateCoaches: builder.mutation({
      query: ({ id, data }) => ({
        url: `/coaches/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["coaches"],
    }),
  }),
});

export const {
  useGetCoachesQuery,
  useGetSingleCoachesQuery,
  useAddVideoRequestsMutation,
  useUpdateCoachesMutation,
  useGetReviewsForAUserQuery,
} = HireCoachs;
