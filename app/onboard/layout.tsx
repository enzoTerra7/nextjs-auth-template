import { verifySession } from "@/lib/auth/dal";
import { redirect } from "next/navigation";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await verifySession();

  if (!session) {
    redirect("/auth/login");
  }

  return <>{children}</>;
}
