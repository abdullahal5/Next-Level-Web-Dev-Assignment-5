import { baseApi } from "../../api/baseApi";

const roomManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSingleBookings: builder.query({
      query: (id) => ({
        url: `/bookings/${id}`,
        method: "GET",
      }),
      providesTags: ["booking"],
    }),
    myBooking: builder.query({
      query: () => ({
        url: `/my-bookings`,
        method: "GET",
      }),
      providesTags: ["booking"],
    }),
  }),
});

export const { useGetSingleBookingsQuery, useMyBookingQuery } =
  roomManagementApi;
