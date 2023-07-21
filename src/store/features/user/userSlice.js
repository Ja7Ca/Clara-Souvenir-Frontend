import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Auth from "../../../utils/Auth";
import CONST from "../../../utils/constants";

export const userSlice = createApi({
    reducerPath: "userSlice",
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
    tagTypes: ["Auth"],
    endpoints: (builder) => ({
        login: builder.mutation({
            query: ({ username, password }) => ({
                url: "/login",
                method: "POST",
                body: { username, password },
            }),
            transformResponse(response) {
                Auth.storeUserInfoToCookie(response.data);
                return response;
            },
            providesTags: ["Auth"],
        }),
        register: builder.mutation({
            query: ({ fullname, alamat, username, password }) => ({
                url: "/register",
                method: "POST",
                body: { fullname, alamat, username, password },
            }),
            invalidatesTags: ["Auth"],
        }),
        whoami: builder.query({
            query: () => ({
                url: "/whoami",
                method: "GET",
                headers: { Autorization: Auth.getAccessToken() },
            }),
            transformResponse: (response) => response,
            providesTags: ["Auth"],
        }),
        forgot: builder.mutation({
            query: (data) => ({
                url: "/forgot",
                method: "POST",
                body: data,
            }),
            transformResponse: (response) => response,
            invalidatesTags: ["Auth"],
        }),
        getUserKey: builder.query({
            query: (key) => ({
                url: `/getuserkey/${key}`,
                method: "GET",
            }),
            transformResponse: (response) => response,
            invalidatesTags: ["Auth"],
        }),
        changeForgotPass: builder.mutation({
            query: (data) => ({
                url: "/changeforgotpassword",
                method: "POST",
                body: data,
            }),
            transformResponse: (response) => response,
            invalidatesTags: ["Auth"],
        }),
    }),
});
export const {
    useLoginMutation,
    useRegisterMutation,
    useWhoamiQuery,
    useForgotMutation,
    useGetUserKeyQuery,
    useChangeForgotPassMutation,
} = userSlice;
