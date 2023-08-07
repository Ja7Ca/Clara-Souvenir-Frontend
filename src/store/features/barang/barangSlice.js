import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Auth from "../../../utils/Auth";
import CONST from "../../../utils/constants";

export const barangSlice = createApi({
    reducerPath: "barangSlice",
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
    tagTypes: ["Barang"],
    endpoints: (builder) => ({
        getBarang: builder.query({
            query: () => ({
                url: `/barang`,
                method: "GET",
                headers: { Autorization: Auth.getAccessToken() },
            }),
            transformResponse: (response) => response,
            providesTags: ["Barang"],
        }),
        getAllBarang: builder.query({
            query: () => ({
                url: `/allBarang`,
                method: "GET",
                headers: { Autorization: Auth.getAccessToken() },
            }),
            transformResponse: (response) => response,
            providesTags: ["Barang"],
        }),
        getOneBarang: builder.query({
            query: (id) => ({
                url: `/barang/${id}`,
                method: "GET",
                headers: { Autorization: Auth.getAccessToken() },
            }),
            transformResponse: (response) => response,
            providesTags: ["Barang"],
        }),
        updateBarang: builder.mutation({
            query: (data) => ({
                url: `/barang/${data.id}`,
                method: "PUT",
                headers: { Autorization: Auth.getAccessToken() },
                body: data,
            }),
            transformResponse: (response) => response,
            providesTags: ["Barang"],
        }),
        addBarang: builder.mutation({
            query: (data) => ({
                url: `/barang`,
                method: "POST",
                headers: { Autorization: Auth.getAccessToken() },
                body: data,
            }),
            transformResponse: (response) => response,
            providesTags: ["Barang"],
        }),
    }),
});
export const {
    useGetBarangQuery,
    useGetAllBarangQuery,
    useGetOneBarangQuery,
    useUpdateBarangMutation,
    useAddBarangMutation,
} = barangSlice;
