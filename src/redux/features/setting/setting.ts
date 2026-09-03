"use client";
import { baseApi } from "@/redux/api/baseApi";

const setting = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    settings: builder.query({
      query: (slug) => ({
        url: `/settings/${slug}`,
        method: "GET",
      }),
      transformResponse: (response) => response,
    }),
    getNotification: builder.query({
      query: (slug) => ({
        url: `/notifications/${slug}`,
        method: "GET",
      }),
      transformResponse: (response) => response,
    }),
    getReviews: builder.query({
      query: (page = 1) => ({
        url: `/ratings/public-reviews/all?page=${page}&limit=10`,
        method: "GET",
      }),
      transformResponse: (response) => response,
    }),
  }),
});
export const {
  useSettingsQuery,
  useGetReviewsQuery,
} = setting;
