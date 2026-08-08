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

    getClubHirings: builder.query<
      any,
      { page?: number; limit?: number } | void
    >({
      query: (args) => ({
        url: "/club-hiring/mine",
        method: "GET",
        params: {
          page: args?.page ?? 1,
          limit: args?.limit ?? 10,
        },
      }),
      providesTags: ["Club"],
    }),

    getClubAgentsConnected: builder.query<
      any,
      { page?: number; limit?: number } | void
    >({
      query: (args) => ({
        url: "/clubs/connected-agents",
        method: "GET",
        params: {
          page: args?.page ?? 1,
          limit: args?.limit ?? 10,
        },
      }),
      providesTags: ["Club"],
    }),

    getClubAgentsStatistics: builder.query<
      any,
      { page?: number; limit?: number; id: string } | void
    >({
      query: (args) => ({
        url: `/clubs/agent-recommended-list/${args?.id}`,
        method: "GET",
        params: {
          page: args?.page ?? 1,
          limit: args?.limit ?? 10,
        },
      }),
      providesTags: ["Club"],
    }),

    getClubPlayerList: builder.query<any, { page?: number; limit?: number; id: string } | void>({
      query: (args) => ({
        url: "/clubs/club-player-list",
        method: "GET",
        params: {
          page: args?.page ?? 1,
          limit: args?.limit ?? 10,
        },
      }),
      providesTags: ["Club"],
    }),

    getClubHiringsAccept: builder.query<
      any,
      { page?: number; limit?: number; status?: string } | void
    >({
      query: (args) => ({
        url: "/club-hiring/mine",
        method: "GET",
        params: {
          page: args?.page ?? 1,
          limit: args?.limit ?? 10,
          ...(args?.status && { status: args.status }),
        },
      }),
      providesTags: ["Club"],
    }),

    getSingleClub: builder.query<any, string>({
      query: (id) => ({
        url: `/club-hiring/${id}`,
        method: "GET",
      }),
      providesTags: ["Club"],
    }),

    getClubRecommendations: builder.query<any, string>({
      query: (id) => ({
        url: `/club-hiring/${id}/recommendations`,
        method: "GET",
      }),
      providesTags: ["Club"],
    }),

    addClub: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/club-hiring",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Club"],
    }),

    updateClub: builder.mutation<any, { id: string; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: `/club-hiring/recommendations/${id}/status`,
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
  useGetClubStatisticsQuery,
  useGetClubAgentsConnectedQuery,
  useGetClubAgentsStatisticsQuery,
  useGetClubRecommendationsQuery,
  useGetClubPlayerListQuery,
  useGetClubHiringsQuery,
  useGetSingleClubQuery,
  useAddClubMutation,
  useUpdateClubMutation,
  useDeleteClubMutation,
  useGetClubHiringsAcceptQuery
} = Club;
