"use server";

import { LoginBody } from "./login.type";

export async function loginService(body: LoginBody) {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Failed to login");
  }

  return response.json();
}
