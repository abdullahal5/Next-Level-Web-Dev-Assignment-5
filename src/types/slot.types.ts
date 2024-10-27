export interface SlotData {
  success: boolean;
  statusCode: number;
  message: string;
  data: SlotDataInfo;
}

export interface SlotDataInfo {
  _id: string;
  name: string;
  images: string[];
  roomNo: number;
  capacity: number;
  floorNo: number;
  pricePerSlot: number;
  amenities: string[];
  isDeleted: boolean;
  updatedAt: string;
}
