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
    getAllSlot: builder.query<void, string | undefined | null>({
      query: (date) => {
        // console.log(date)
        let url = "/slots";

        if (date) {
          url += `?date=${encodeURIComponent(date)}`;
        }

        return {
          url,
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
    deleteSlot: builder.mutation({
      query: ({ id, body }) => {
        return {
          url: `slots/${id}`,
          method: "DELETE",
          body,
        };
      },
      invalidatesTags: ["slot"],
    }),
    getMultipleSlot: builder.query({
      query: (ids) => {
        const idsString = ids.join(",");
        console.log(idsString)
        return {
          url: `slots/multiple/${idsString}`,
          method: "GET",
        };
      },
      providesTags: ["slot"],
    }),
  }),
});

export const {
  useCreateSlotMutation,
  useGetSingleSlotQuery,
  useGetAllSlotQuery,
  useUpdateSlotMutation,
  useDeleteSlotMutation,
  useGetMultipleSlotQuery
} = ManagementApi;
