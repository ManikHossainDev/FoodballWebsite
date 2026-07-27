/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { baseApi } from "@/redux/api/baseApi";

export const Club = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getClubStatistics: builder.query<any, string>({
      query: () => ({
        url: "/clubs/dashboard-statistics",
        method: "GET",
      }),
      providesTags: ["Club"],
    }),

    getClub: builder.query<any, { page?: number; limit?: number } | void>({
      query: (args) => ({
        url: "/users/Club",
        method: "GET",
        params: {
          page: args?.page ?? 1,
          limit: args?.limit ?? 10,
        },
      }),
      providesTags: ["Club"],
    }),

    getSingleClub: builder.query<any, string>({
      query: (id) => ({
        url: `/users/Club/${id}`,
        method: "GET",
      }),
      providesTags: ["Club"],
    }),

    addClub: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/users/Club",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Club"],
    }),

    updateClub: builder.mutation<any, { id: string; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: `/users/Club/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Club"],
    }),

    deleteClub: builder.mutation<void, string>({
      query: (id) => ({
        url: `/users/Club/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Club"],
    }),
  }),
});

export const {
  useGetClubQuery,
  useGetClubStatisticsQuery,
  useGetSingleClubQuery,
  useAddClubMutation,
  useUpdateClubMutation,
  useDeleteClubMutation,
} = Club;
