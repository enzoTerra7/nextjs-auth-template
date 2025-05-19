import { UserDto } from "@/core/dtos/user";

export interface IUserRepository {
  getUserByEmail(data: { email: string }): Promise<UserDto>;
  createAdminUser(data: {
    email: string;
    hashedPassword: string;
    name: string;
  }): Promise<UserDto>;
  editUser(id: number, data: Partial<UserDto>): Promise<UserDto>;
  // getUserById(id: number): Promise<User>;
  // getUserByEmail(email: string): Promise<User>;
  // updateUser(user: User): Promise<User>;
  // deleteUser(id: number): Promise<void>;
}
