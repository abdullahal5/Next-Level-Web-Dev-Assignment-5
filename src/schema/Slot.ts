import { z } from "zod";

const dateSchema = z.object({
  value: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
});

const timeSchema = z.object({
  value: z
    .string()
    .regex(/^\d{2}:\d{2}$/)
    .optional(),
});

export const slotSchema = z.object({
  room: z.string({ required_error: "Room field is required" }),
  date: z.string({ required_error: "Room field is required" }),
  startTime: z.string({ required_error: "Room field is required" }),
  endTime: z.string({ required_error: "Room field is required" }),
});
