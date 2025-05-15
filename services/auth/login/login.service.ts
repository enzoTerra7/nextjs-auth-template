"use server";

import fetcher from "@/lib/fetcher";
import { LoginBody, LoginResponse } from "./login.type";

export async function loginService(body: LoginBody) {
  const response = await fetcher.post<LoginResponse>("/api/auth/login", body);
  console.log("response", response);
  return response.data;
}
