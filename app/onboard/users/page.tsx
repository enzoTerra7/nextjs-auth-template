import { PageTitle } from "@/app/_components/ui/page-title";
import { UsersTable } from "./users.table";
import { getUsers } from "./users.action";
export default async function UsersPage() {
  const [users] = await getUsers();
  return (
    <>
      <PageTitle title="Users" description="Manage your users" />
      <UsersTable data={users || []} />
    </>
  );
}
