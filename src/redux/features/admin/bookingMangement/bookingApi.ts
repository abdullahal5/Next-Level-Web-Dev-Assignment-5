/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../../api/baseApi";

const roomManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBookings: builder.query<void, any>({
      query: () => ({
        url: "/bookings",
        method: "GET",
      }),
      providesTags: ["booking"],
    }),
    updateBooking: builder.mutation<
      void,
      { id: string | undefined; body: any }
    >({
      query: ({ id, body }) => ({
        url: `/bookings/${id}`,
        method: "PUT",
        body: { isConfirmed: body },
      }),
      invalidatesTags: ["booking"],
    }),
    deleteBooking: builder.mutation<void, { id: string | undefined }>({
      query: ({ id }) => ({
        url: `/bookings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["booking"],
    }),
  }),
});

export const {
  useGetAllBookingsQuery,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
} = roomManagementApi;
