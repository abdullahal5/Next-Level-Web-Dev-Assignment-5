export type RoomData = {
  _id: string;
  name: string;
  roomNo: number;
  floorNo: number;
  pricePerSlot: number;
  amenities: string[];
  isDeleted: boolean;
  capacity: number;
  images: string[];
};

export type RoomCardProps = {
  item: RoomData;
};

export type RoomDetailsType = {
  _id: string;
  name: string;
  roomNo: number;
  floorNo: number;
  pricePerSlot: number;
  amenities: string[];
  isDeleted: boolean;
  capacity: number;
  images: string[];
};