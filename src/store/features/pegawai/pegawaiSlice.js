import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Auth from "../../../utils/Auth";
import CONST from "../../../utils/constants";

export const pegawaiSlice = createApi({
    reducerPath: "pegawaiSlice",
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
    tagTypes: ["Pegawai"],
    endpoints: (builder) => ({
        getPegawai: builder.query({
            query: () => ({
                url: "/pegawai",
                method: "GET",
                headers: { Autorization: Auth.getAccessToken() },
            }),
            transformResponse: (response) => response,
            providesTags: ["pegawai"],
        }),
        getOnePegawai: builder.query({
            query: (id) => ({
                url: `/pegawai/${id}`,
                method: "GET",
                headers: { Autorization: Auth.getAccessToken() },
            }),
            transformResponse: (response) => response,
            providesTags: ["pegawai"],
        }),
        addPegawai: builder.mutation({
            query: (data) => ({
                url: "/pegawai",
                method: "POST",
                body: data,
                headers: { Autorization: Auth.getAccessToken() },
            }),
            transformResponse: (response) => response,
            providesTags: ["pegawai"],
        }),
        editPegawai: builder.mutation({
            query: (data) => ({
                url: `/pegawai/${data.id}`,
                method: "PUT",
                body: data.form,
                headers: { Autorization: Auth.getAccessToken() },
            }),
            transformResponse: (response) => response,
            providesTags: ["pegawai"],
        }),
        deletePegawai: builder.mutation({
            query: (id) => ({
                url: `/pegawai/${id}`,
                method: "DELETE",
                headers: { Autorization: Auth.getAccessToken() },
            }),
            transformResponse: (response) => response,
            providesTags: ["pegawai"],
        }),
    }),
});
export const {
    useGetPegawaiQuery,
    useGetOnePegawaiQuery,
    useAddPegawaiMutation,
    useEditPegawaiMutation,
    useDeletePegawaiMutation,
} = pegawaiSlice;
