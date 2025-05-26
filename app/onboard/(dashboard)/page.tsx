import { verifySession } from "@/app/_lib/auth/dal";
import { AdminDashboard } from "./_views/admin";
import { UserDashboard } from "./_views/user";

export default async function Dashboard() {
  const session = await verifySession();

  return session.role === "admin" ? <AdminDashboard /> : <UserDashboard />;
}
