import { baseApi } from "../../../api/baseApi";

/* eslint-disable @typescript-eslint/no-explicit-any */
const ManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSlot: builder.mutation<void, any>({
      query: (newRoom) => {
        console.log(newRoom)
        return {
          url: "/slots",
          method: "POST",
          body: newRoom,
        };
      },
      invalidatesTags: ["slot"],
    }),
  }),
});

export const {
  useCreateSlotMutation,
} = ManagementApi;
