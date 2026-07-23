/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { baseApi } from "@/redux/api/baseApi";
export const coachApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCoachStatistics: builder.query<any, void>({
      query: () => ({
        url: "/coaches/statistics",
        method: "GET",
      }),
      providesTags: ["Coach"],
    }),

    getVideoRequests: builder.query<any, string | undefined>({
      query: (status) => ({
        url: `/player-video-request?status=${status}`,
        method: "GET",
      }),
      providesTags: ["Coach"],
    }),

    singleVideoRequest: builder.query<any, string>({
      query: (id) => ({
        url: `/player-video-request/${id}`,
        method: "GET",
      }),
      providesTags: ["Coach"],
    }),

    actionVideoReq: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/player-video-request/${id}/status`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Coach"],
    }),

    completeAcceptedOrders: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/player-video-request/${id}/complete`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Coach"],
    }),

    cancelVideoReq: builder.mutation<any, string>({
      query: (id) => ({
        url: `/player-video-request/${id}/cancel`,
        method: "PATCH",
      }),
      invalidatesTags: ["Coach"],
    }),

    getConsultations: builder.query<any, { status?: string }>({
      query: ({ status }) => ({
        url: `/player-consultation?status=${status}`,
        method: "GET",
      }),
      providesTags: ["Coach"],
    }),

    singleConsultation: builder.query<any, string>({
      query: (id) => ({
        url: `/player-consultation/${id}`,
        method: "GET",
      }),
      providesTags: ["Coach"],
    }),

    actionConsultation: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/player-consultation/${id}/status`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Coach"],
    }),

    startConsultation: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `/player-consultation/${id}/start`,
        method: "PATCH",
      }),
      invalidatesTags: ["Coach"],
    }),

    consultationMeeting: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/player-consultation/${id}/meeting`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Coach"],
    }),

    cancelConsultation: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `/player-consultation/${id}/cancel`,
        method: "PATCH",
      }),
      invalidatesTags: ["Coach"],
    }),

    consultationComplete: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/player-consultation/${id}/complete`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Coach"],
    }),

    submitReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `/video-request/${id}/review`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetCoachStatisticsQuery,
  useGetVideoRequestsQuery,
  useSingleVideoRequestQuery,
  useActionVideoReqMutation,
  useCompleteAcceptedOrdersMutation,
  useCancelVideoReqMutation,
  useGetConsultationsQuery,
  useSingleConsultationQuery,
  useActionConsultationMutation,
  useStartConsultationMutation,
  useConsultationMeetingMutation,
  useCancelConsultationMutation,
  useConsultationCompleteMutation,
  useSubmitReviewMutation
} = coachApi;
