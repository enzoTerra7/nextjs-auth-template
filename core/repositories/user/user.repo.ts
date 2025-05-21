import "server-only";

import type { IUserRepository } from "./user.repo.definition";
import { UserDto } from "@/core/dtos/user";
import { db as drizzle, DrizzleDatabase } from "@/db";
import { usersTable } from "@/db/table/user";
import { eq } from "drizzle-orm";

export class UserRepository implements IUserRepository {
  private readonly db: DrizzleDatabase;
  constructor() {
    // TODO: Instantiate database connection here; Inject bcrypt here
    this.db = drizzle;
  }

  async getUserByEmail(data: { email: string }): Promise<UserDto> {
    const { email } = data;
    try {
      const user = await this.db.query.usersTable.findFirst({
        where: eq(usersTable.email, email),
      });

      if (!user) {
        throw new Error("Invalid credentials");
      }

      return UserDto.fromDb(user);
    } catch (error) {
      throw new Error("Failed to get user by email", {
        cause: error,
      });
    }
  }

  async createAdminUser(data: {
    email: string;
    hashedPassword: string;
    name: string;
  }): Promise<UserDto> {
    const { email, hashedPassword, name } = data;

    try {
      const [user] = await this.db
        .insert(usersTable)
        .values({
          email,
          password: hashedPassword,
          name,
          role: "admin",
        })
        .returning();

      return UserDto.fromDb(user);
    } catch (error) {
      throw new Error("Failed to create admin user", {
        cause: error,
      });
    }
  }

  async editUser(
    id: number,
    data: Partial<Omit<UserDto, "id" | "email">>
  ): Promise<UserDto> {
    try {
      const [user] = await this.db
        .update(usersTable)
        .set({
          ...(data.name && { name: data.name }),
          ...(data.password && { password: data.password }),
          ...(data.role && { role: data.role }),
          ...(data.email_verified_at && {
            emailVerifiedAt: data.email_verified_at,
          }),
        })
        .where(eq(usersTable.id, id))
        .returning();

      return UserDto.fromDb(user);
    } catch (error) {
      throw new Error("Failed to edit user", {
        cause: error,
      });
    }
  }

  async getUsers(): Promise<UserDto[]> {
    try {
      const users = await this.db.query.usersTable.findMany();
      return users.map(UserDto.fromDb);
    } catch (error) {
      throw new Error("Failed to get users", {
        cause: error,
      });
    }
  }

  async createUser(data: {
    name: string;
    email: string;
    password: string;
    role: "admin" | "user";
  }): Promise<UserDto> {
    try {
      const [user] = await this.db
        .insert(usersTable)
        .values({
          ...data,
        })
        .returning();
      return UserDto.fromDb(user);
    } catch (error) {
      throw new Error("Failed to create user", {
        cause: error,
      });
    }
  }
}
