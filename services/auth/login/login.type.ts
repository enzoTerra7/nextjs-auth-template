import { LoginFormSchema } from "@/features/auth/login/login.definitions";
import { z } from "zod";

export type LoginBody = z.infer<typeof LoginFormSchema>;
