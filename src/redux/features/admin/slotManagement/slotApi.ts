import { baseApi } from "../../../api/baseApi";

/* eslint-disable @typescript-eslint/no-explicit-any */
const ManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSlot: builder.mutation<void, any>({
      query: (newRoom) => {
        console.log(newRoom);
        return {
          url: "/slots",
          method: "POST",
          body: newRoom,
        };
      },
      invalidatesTags: ["slot"],
    }),
    getAllSlot: builder.query<void, any>({
      query: () => {
        return {
          url: "/slots",
          method: "GET",
        };
      },
      providesTags: ["slot"],
    }),
    getSingleSlot: builder.query<void, any>({
      query: (id) => {
        return {
          url: `slots/${id}`,
          method: "GET",
        };
      },
      providesTags: ["slot"],
    }),
    updateSlot: builder.mutation({
      query: ({ id, body }) => {
        return {
          url: `slots/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["slot"],
    }),
  }),
});

export const {
  useCreateSlotMutation,
  useGetSingleSlotQuery,
  useGetAllSlotQuery,
  useUpdateSlotMutation,
} = ManagementApi;
