import { Columns, DataTable } from "@/app/_components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/app/_components/ui/dropdown-menu";
import { User } from "@/db/table/user";
import { format } from "date-fns";
import { Button } from "@/app/_components/ui/button";
import { EllipsisVerticalIcon } from "lucide-react";
import { EditUserModal } from "./edit-user-modal";
import { DeleteUserAlert } from "./delete-user.modal";

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
  {
    header: "",
    id: "actions",
    cell: (user) => {
      if (user.role === "admin") {
        return null;
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <EllipsisVerticalIcon className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <EditUserModal
              id={user.id}
              email={user.email}
              name={user.name}
              role={user.role}
            >
              Edit
            </EditUserModal>
            <DeleteUserAlert id={user.id}>Delete</DeleteUserAlert>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    className: "w-9",
  },
];

export function UsersTable({ data }: { data: UsersTableData[] }) {
  return (
    <DataTable columns={usersTableColumns} data={data} isLoading={false} />
  );
}
