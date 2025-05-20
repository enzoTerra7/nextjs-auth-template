import "server-only";
import { redirect } from "next/navigation";
import { createServerActionProcedure } from "zsa";
import { verifySession } from "../auth/dal";

export const userProcedure = createServerActionProcedure().handler(async () => {
  const session = await verifySession();
  if (!session) {
    return redirect("/auth/signin");
  }

  if (session.role !== "user") {
    return redirect("/");
  }

  return session;
});
