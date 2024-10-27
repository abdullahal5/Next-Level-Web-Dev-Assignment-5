export type TRoom = {
  name: string;
  roomNo: number;
  floorNo: number;
  pricePerSlot: number;
  amenities: [string];
  isDeleted: boolean;
  capacity: number;
  images: [string];
};

type TRole = {
  admin: string;
  user: string;
};

export type TUser = {
  name: string;
  email: string;
  password: string;
  profileImage: string;
  phone: string;
  address: string;
  role: TRole;
};
export type TSlot = {
  room: TRoom;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
};

export type TBooking = {
  createdAt: string;
  _id: string;
  room: TRoom;
  slots: TSlot;
  user: TUser;
  date: string;
  totalAmount: number;
  isConfirmed: "confirmed" | "unconfirmed" | "canceled";
  isDeleted: boolean;
};
