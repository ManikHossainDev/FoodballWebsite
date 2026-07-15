/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { baseApi } from "@/redux/api/baseApi";
export const FileUpload = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getFileUploadSignature: builder.query({
      query: (folder) => ({
        url: `/file/upload-signature?folder=${folder}`,
        method: "GET",
      }),
      providesTags: ["file"],
    }),
    
  }),
});

export const {
 useGetFileUploadSignatureQuery
} = FileUpload;
