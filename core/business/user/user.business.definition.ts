// import { UserDto } from "@/core/dtos/user";
import { User } from "@/db/table/user";

export interface IUserBusiness {
  getUsers(): Promise<Omit<User, "password">[]>;
  createUser({
    name,
    email,
    role,
  }: {
    name: string;
    email: string;
    role: "admin" | "user";
  }): Promise<void>;
  editUser(
    id: number,
    {
      name,
      role,
    }: {
      name: string;
      role: "admin" | "user";
    }
  ): Promise<void>;
  deleteUser(id: number): Promise<void>;
}
