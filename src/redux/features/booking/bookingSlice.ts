import { createSlice } from "@reduxjs/toolkit";

export interface IBooking {
  name: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  date: string[] | null;
  user: string | null;
  room: string | null;
  slots: string[] | null;
  price: number | null;
}

const initialState: IBooking = {
  name: null,
  email: null,
  phone: null,
  address: null,
  date: [],
  user: null,
  room: null,
  slots: [],
  price: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBooking: (state, action) => {
      const {
        name,
        email,
        phone,
        address,
        date,
        user,
        room,
        slots,
        pricePerSlot,
      } = action.payload;
      state.name = name || null;
      state.email = email || null;
      state.phone = phone || null;
      state.address = address || null;
      state.date = date || [];
      state.user = user || null;
      state.room = room || null;
      state.slots = slots || [];
      state.price = pricePerSlot || null;
    },
  },
});

export const { setBooking } = bookingSlice.actions;

export default bookingSlice.reducer;
