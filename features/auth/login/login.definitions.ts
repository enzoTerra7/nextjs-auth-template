import { FormState } from "@/lib/definitions";
import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email({
    message: "Invalid email address. ",
  }),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long. " })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter. " })
    .regex(/[0-9]/, { message: "Contain at least one number. " })
    .trim(),
});

export type LoginFormState = FormState<z.infer<typeof LoginFormSchema>>;
