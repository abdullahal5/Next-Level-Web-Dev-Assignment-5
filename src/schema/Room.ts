import { z } from "zod";

export const roomSchema = z.object({
  name: z.string({ required_error: "Name field required" }),
  roomNo: z.string({ required_error: "Room no field required" }),
  pricePerSlot: z.string({ required_error: "Price Per Slot field required" }),
  amenities: z
    .array(z.string(), { required_error: "Amenities field required" })
    .nonempty({ message: "At least one amenity is required" }),
  capacity: z.string({ required_error: "Capacity field required" }),
  floorNo: z.string({ required_error: "Floor No. field required" }),
  // image: z.string({ required_error: "unage field required" }),
});
