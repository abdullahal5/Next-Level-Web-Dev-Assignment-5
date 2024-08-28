/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../../api/baseApi";

const roomManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createRoom: builder.mutation<void, any>({
      query: (newRoom) => ({
        url: "/rooms",
        method: "POST",
        body: newRoom,
      }),
      invalidatesTags: ["room"],
    }),
    updateRoom: builder.mutation<void, { id: string | undefined; body: any }>({
      query: ({ id, body }) => ({
        url: `/rooms/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["room"],
    }),
    deleteRoom: builder.mutation<void, { id: string | undefined }>({
      query: ({ id }) => ({
        url: `/rooms/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["room"],
    }),
  }),
});

export const {
  useCreateRoomMutation,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
} = roomManagementApi;
