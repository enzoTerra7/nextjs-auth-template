import { UserDto } from "@/core/dtos/user";

export interface IUserRepository {
  getUserByEmail(data: { email: string }): Promise<UserDto>;
  createAdminUser(data: {
    email: string;
    hashedPassword: string;
    name: string;
  }): Promise<UserDto>;
  editUser(id: number, data: Partial<UserDto>): Promise<UserDto>;
  getUsers(): Promise<UserDto[]>;
  createUser(data: {
    name: string;
    email: string;
    password: string;
    role: "admin" | "user";
  }): Promise<UserDto>;
  deleteUser(id: number): Promise<UserDto>;
}
