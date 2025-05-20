import { UserDto } from "@/core/dtos/user";
import { User } from "@/db/table/user";

export interface IUserBusiness {
  signin(data: { email: string; password: string }): Promise<{
    email: string;
    role: string;
    id: number;
    name: string;
    isVerified: boolean;
  }>;
  signup(data: { email: string; password: string; name: string }): Promise<{
    email: string;
    role: string;
    id: number;
    name: string;
    isVerified: boolean;
  }>;
  sendEmailVerification(data: {
    name: string;
    template: React.ReactNode;
  }): Promise<void>;
  verifyEmail(id: number): Promise<UserDto>;

  getUsers(): Promise<Omit<User, "password">[]>;
}
