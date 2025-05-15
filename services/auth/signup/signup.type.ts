import { SignUpFormSchema } from "@/features/auth/signup/signup.definitions";
import type { UserRoles } from "@/lib/definitions";
import { z } from "zod";

export type SignUpBody = z.infer<typeof SignUpFormSchema>;

export type SignUpResponse = {
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRoles;
  };
};
