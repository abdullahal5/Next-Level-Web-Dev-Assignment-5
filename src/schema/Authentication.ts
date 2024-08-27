import { z } from "zod";

export const signupSchema = z.object({
  name: z.string({ required_error: "Name field required" }),
  email: z.string({ required_error: "Email field required" }),
  password: z.string({ required_error: "Password field required" }),
});

export const loginSchema = z.object({
  email: z.string({ required_error: "Email field required" }),
  password: z.string({ required_error: "Password field required" }),
});