"use server";

import fetcher from "@/lib/fetcher";
import { SignUpBody, SignUpResponse } from "./signup.type";

export async function signupService(body: SignUpBody) {
  const response = await fetcher.post<SignUpResponse>("/api/auth/signup", body);

  return response.data;
}
