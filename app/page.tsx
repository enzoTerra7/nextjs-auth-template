import { verifySession } from "@/app/_lib/auth/dal";
import { redirect } from "next/navigation";
export default async function Home() {
  const session = await verifySession();

  if (!session) {
    redirect("/auth/signin");
  }

  redirect("/onboard");
}
