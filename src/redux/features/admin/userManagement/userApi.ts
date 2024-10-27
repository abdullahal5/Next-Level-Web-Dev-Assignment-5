import { baseApi } from "../../../api/baseApi";

/* eslint-disable @typescript-eslint/no-explicit-any */
const UserManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAlluser: builder.query({
      query: () => {
        return {
          url: `/auth/get-user`,
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),
  }),
});

export const { useGetAlluserQuery } = UserManagementApi;
