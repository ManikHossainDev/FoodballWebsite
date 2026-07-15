/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { baseApi } from "@/redux/api/baseApi";
export const playersApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getPlayersStatistics: builder.query<any, void>({
      query: () => ({
        url: "/players/statistics",
        method: "GET",
      }),
      providesTags: ["Players"],
    }),

    getTopRatedCoaches: builder.query({
      query: () => ({
        url: "/users/coaches",
        method: "GET",
      }),
      providesTags: ["Players"],
    }),

    getTopRatedClubs: builder.query({
      query: () => ({
        url: "/users/agents",
        method: "GET",
      }),
      providesTags: ["Players"],
    }),

    updatePlayer: builder.mutation({
      query: ({ id, data }) => ({
        url: `/players/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Players"],
    }),

    getSignPredictionDaily: builder.mutation({
      query: (data) => ({
        url: "/sign-prediction-daily",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Players"],
    }),
  }),
});

export const {
  useGetTopRatedCoachesQuery,
  useGetTopRatedClubsQuery,
  useUpdatePlayerMutation,
  useGetSignPredictionDailyMutation,
  useGetPlayersStatisticsQuery
} = playersApi;
