import { Columns, DataTable } from "@/app/_components/ui/data-table";
import { User } from "@/db/table/user";
import { format } from "date-fns";

type UsersTableData = Omit<User, "password">;

export const usersTableColumns: Columns<UsersTableData>[] = [
  {
    id: "name",
    header: "Name",
    cell: (user) => user.name,
  },
  {
    id: "email",
    header: "Email",
    cell: (user) => user.email,
  },
  {
    accessorKey: "role",
    header: "Role",
    id: "role",
    className: "uppercase",
  },
  {
    header: "Email Verified At",
    id: "emailVerifiedAt",
    cell: (user) =>
      user.emailVerifiedAt
        ? format(new Date(user.emailVerifiedAt), "MM/dd/yyyy")
        : "---",
  },
  {
    header: "Created At",
    id: "createdAt",
    cell: (user) => format(user.createdAt, "MM/dd/yyyy"),
    className: "w-40",
  },
];

export function UsersTable({ data }: { data: UsersTableData[] }) {
  return (
    <DataTable columns={usersTableColumns} data={data} isLoading={false} />
  );
}
