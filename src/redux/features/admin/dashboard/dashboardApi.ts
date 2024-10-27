/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "../../../api/baseApi";

const DashboardManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllDashboardData: builder.query<void, any>({
      query: () => ({
        url: "/dashboard/dashboard-data",
        method: "GET",
      }),
      providesTags: ["booking", "room", "slot"],
    }),
  }),
});

export const { useGetAllDashboardDataQuery } = DashboardManagementApi;
