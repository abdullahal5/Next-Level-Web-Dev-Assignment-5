import { baseApi } from "./../../api/baseApi";

const roomApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRooms: builder.query({
      query: ({
        price,
        capacity,
        searchTerm,
        sortOrder,
      }: {
        price?: number;
        capacity?: number;
        searchTerm?: string;
        sortOrder?: string;
      }) => {
        let query = `/rooms?`;

        if (searchTerm) query += `search=${encodeURIComponent(searchTerm)}&`;
        if (capacity) query += `capacity=${capacity}&`;
        if (price) query += `price=${price}&`;
        if (sortOrder) query += `sort=${sortOrder}&`;

        return {
          url: query,
          method: "GET",
        };
      },
      providesTags: ["room"]
    }
  ),

    getSingleRoom: builder.query({
      query: (arg: string | undefined) => ({
        url: `/rooms/${arg}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllRoomsQuery, useGetSingleRoomQuery } = roomApi;
