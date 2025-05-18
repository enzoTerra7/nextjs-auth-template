import { UserDto } from "@/core/dtos/user";

export interface IUserRepository {
  signin(data: { email: string }): Promise<UserDto>;
  signup(data: {
    email: string;
    hashedPassword: string;
    name: string;
  }): Promise<UserDto>;
  // getUserById(id: number): Promise<User>;
  // getUserByEmail(email: string): Promise<User>;
  // updateUser(user: User): Promise<User>;
  // deleteUser(id: number): Promise<void>;
}
