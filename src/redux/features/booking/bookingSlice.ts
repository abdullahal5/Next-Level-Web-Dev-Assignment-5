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
  totalPrice: number | null;
  roomName: string | null;
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
  roomName: null,
  totalPrice: null,
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
        roomName,
        totalPrice,
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
      state.roomName = roomName || null;
      state.totalPrice = totalPrice || null;
    },
    clearBooking: (state) => {
      state.name = null;
      state.email = null;
      state.phone = null;
      state.address = null;
      state.date = [];
      state.user = null;
      state.room = null;
      state.slots = [];
      state.price = null;
      state.roomName = null;
      state.totalPrice = null;
    },
  },
});

export const { setBooking, clearBooking } = bookingSlice.actions;

export default bookingSlice.reducer;
