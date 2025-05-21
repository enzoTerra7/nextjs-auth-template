import { PageTitle } from "@/app/_components/ui/page-title";
import { UsersTable } from "./users.table";
import { getUsers } from "./users.action";
import { CreateUserModal } from "./create-user.modal";
export default async function UsersPage() {
  const [users] = await getUsers();
  return (
    <>
      <PageTitle title="Users" description="Manage your users">
        <CreateUserModal />
      </PageTitle>
      <UsersTable data={users || []} />
    </>
  );
}
