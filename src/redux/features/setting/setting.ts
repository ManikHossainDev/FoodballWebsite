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
  }),
});
export const {
  useSettingsQuery,
} = setting;
