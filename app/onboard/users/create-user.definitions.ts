import { z } from "zod";

export const CreateUserSchema = z.object({
  name: z.string().min(1, { message: "Name is required. " }),
  email: z.string().email({
    message: "Invalid email address. ",
  }),
  role: z
    .enum(["admin", "user"], {
      message: "Invalid role. ",
    })
    .default("user"),
});
