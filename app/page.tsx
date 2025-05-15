import { verifySession } from "@/lib/auth/dal";
import { redirect } from "next/navigation";
export default async function Home() {
  const session = await verifySession();

  if (session.role === "admin") {
    redirect("/app/admin");
  }

  redirect("/app/user");
}
