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
  }),
});

export const { useCreateRoomMutation } = roomManagementApi;
