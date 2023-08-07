import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Auth from "../../../utils/Auth";
import CONST from "../../../utils/constants";

export const jobSlice = createApi({
    reducerPath: "jobSlice",
    baseQuery: fetchBaseQuery({
        baseUrl: CONST.BASE_URL,
        prepareHeaders: (headers) => {
            const token = Auth.getAccessToken();

            if (token) {
                headers.set("Authorization", `${token}`);
            }

            return headers;
        },
    }),
    tagTypes: ["Job"],
    endpoints: (builder) => ({
        getJob: builder.query({
            query: (pegawai_id) => ({
                url: `/job/${pegawai_id}`,
                method: "GET",
                headers: { Autorization: Auth.getAccessToken() },
            }),
            transformResponse: (response) => response,
            providesTags: ["Job"],
        }),
        getJobDate: builder.query({
            query: ({ pegawai_id, start, end }) => ({
                url: `/job-date/${pegawai_id}?start=${start}&end=${end}`,
                method: "GET",
                headers: { Autorization: Auth.getAccessToken() },
            }),
            transformResponse: (response) => response,
            providesTags: ["Job"],
        }),
        addJob: builder.mutation({
            query: (data) => ({
                url: `/job`,
                method: "POST",
                headers: { Autorization: Auth.getAccessToken() },
                body: data,
            }),
            transformResponse: (response) => response,
            providesTags: ["Job"],
        }),
        getAllJob: builder.query({
            query: (data) => ({
                url: `/allJob?start=${data.start}&end=${data.end}`,
                method: "GET",
                headers: { Autorization: Auth.getAccessToken() },
            }),
            transformResponse: (response) => response,
            providesTags: ["Job"],
        }),
        deleteJob: builder.mutation({
            query: (id) => ({
                url: `/job/${id}`,
                method: "DELETE",
                headers: { Autorization: Auth.getAccessToken() },
            }),
            transformResponse: (response) => response,
            providesTags: ["Job"],
        }),
    }),
});
export const {
    useLazyGetJobQuery,
    useLazyGetJobDateQuery,
    useAddJobMutation,
    useLazyGetAllJobQuery,
    useDeleteJobMutation,
} = jobSlice;
