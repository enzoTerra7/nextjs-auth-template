import { z } from "zod";

export const SignUpSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required. " }),
    email: z.string().email({
      message: "Invalid email address. ",
    }),
    password: z
      .string()
      .min(8, { message: "Be at least 8 characters long. " })
      .regex(/[a-zA-Z]/, { message: "Contain at least one letter. " })
      .regex(/[0-9]/, { message: "Contain at least one number. " })
      .trim(),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required. " }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match. ",
        path: ["confirmPassword"],
      });
    }
  });
