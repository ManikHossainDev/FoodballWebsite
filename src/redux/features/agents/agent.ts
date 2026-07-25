/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { baseApi } from "@/redux/api/baseApi";

export const Agent = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAgentsDashboard: builder.query<any, void>({
      query: () => ({
        url: "/agents/dashboard-statistics",
        method: "GET",
      }),
      providesTags: ["Agent"],
    }),

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

    getClubHiring: builder.query<any, void>({
      query: () => ({
        url: "/club-hiring",
        method: "GET",
      }),
      providesTags: ["Agent"],
    }),

    getSingleClubHiring: builder.query<any, string>({
      query: (id) => ({
        url: `/club-hiring/${id}`,
        method: "GET",
      }),
      providesTags: ["Agent"],
    }),

    addHiringRecommend: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/club-hiring/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Agent"],
    }),

    getClubHiringMyResponses: builder.query<any, void>({
      query: () => ({
        url: "/club-hiring/my-responses",
        method: "GET",
      }),
      providesTags: ["Agent"],
    }),

    // was typed <any, void> but takes an id — fixed to <any, string>
    getOneHiringResponses: builder.query<any, string>({
      query: (id) => ({
        url: `/club-hiring/${id}/responses`,
        method: "GET",
      }),
      providesTags: ["Agent"],
    }),

    getAgents: builder.query<any, void>({
      query: () => ({
        url: "/users/agents",
        method: "GET",
      }),
      providesTags: ["Agent"],
    }),

    // was typed <any, void> but takes an id — fixed to <any, string>
    getAgentsDetails: builder.query<any, string>({
      query: (id) => ({
        url: `/users/agents/${id}`,
        method: "GET",
      }),
      providesTags: ["Agent"],
    }),
  }),
});

export const {
  useGetAgentsDashboardQuery,
  useGetPlayerPlacementQuery,
  useGetSinglePlayerPlacementQuery,
  usePlacementsActionMutation,
  useGetClubHiringQuery,
  useGetSingleClubHiringQuery,
  useAddHiringRecommendMutation,
  useGetClubHiringMyResponsesQuery,
  useGetOneHiringResponsesQuery,
  useGetAgentsQuery,
  useGetAgentsDetailsQuery,
} = Agent;
