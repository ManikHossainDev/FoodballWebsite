/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { baseApi } from "@/redux/api/baseApi";

export const Agents = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAgents: builder.query<any, { page?: number; limit?: number } | void>({
      query: (args) => ({
        url: "/users/agents",
        method: "GET",
        params: {
          page: args?.page ?? 1,
          limit: args?.limit ?? 10,
        },
      }),
      providesTags: ["Agents"],
    }),

    getSingleAgents: builder.query<any, string>({
      query: (id) => ({
        url: `/users/agents/${id}`,
        method: "GET",
      }),
      providesTags: ["Agents"],
    }),

    addAgents: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/player-placement",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Agents"],
    }),

    deleteAgents: builder.mutation<void, string>({
      query: (id) => ({
        url: `/player-album/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Agents"],
    }),
  }),
});

export const {
  useGetAgentsQuery,
  useGetSingleAgentsQuery,
  useAddAgentsMutation,
  useDeleteAgentsMutation,
} = Agents;
