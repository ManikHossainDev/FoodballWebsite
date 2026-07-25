/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { baseApi } from "@/redux/api/baseApi";

export const Agent = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getPlayerPlacement: builder.query<any, void>({
      query: () => ({
        url: "/player-placement",
        method: "GET",
      }),
      providesTags: ["Agent"],
    }),

    getSinglePlayerPlacement: builder.query<any, string>({
      query: (id) => ({
        url: `/player-placement/${id}`,
        method: "GET",
      }),
      providesTags: ["Agent"],
    }),

    placementsAction: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/player-placement/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Agent"],
    }),

    addHiringRecommend: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/club-hiring/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Agent"],
    }),
  }),
});

export const {
  useGetPlayerPlacementQuery,
  useGetSinglePlayerPlacementQuery,
  usePlacementsActionMutation,
  useAddHiringRecommendMutation,
} = Agent;
