import { baseApi } from "./../../api/baseApi";

const roomApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRooms: builder.query({
      query: () => ({
        url: "/rooms",
        method: "GET",
      }),
    }),
    getSingleRoom: builder.query({
      query: (arg) => {
        console.log(arg);
        return {
          url: `/rooms/${arg}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetAllRoomsQuery, useGetSingleRoomQuery } = roomApi;
