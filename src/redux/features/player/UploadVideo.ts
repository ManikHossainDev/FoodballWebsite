/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { baseApi } from "@/redux/api/baseApi";
export const UploadVideo = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getUploadVideo: builder.query<
      any,
      { page?: number; limit?: number } | void
    >({
      query: (args) => ({
        url: "/player-album",
        method: "GET",
        params: {
          page: args?.page ?? 1,
          limit: args?.limit ?? 10,
        },
      }),
      providesTags: ["UploadVideo"],
    }),

    getSingleUploadVideo: builder.query({
      query: (id) => ({
        url: `/users/UploadVideo/${id}`,
        method: "GET",
      }),
      providesTags: ["UploadVideo"],
    }),

    addUploadVideo: builder.mutation({
      query: (data) => ({
        url: "/player-album",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["UploadVideo"],
    }),

    updateUploadVideo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/UploadVideo/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["UploadVideo"],
    }),
  }),
});

export const {
  useGetUploadVideoQuery,
  useGetSingleUploadVideoQuery,
  useUpdateUploadVideoMutation,
  useAddUploadVideoMutation
} = UploadVideo;
