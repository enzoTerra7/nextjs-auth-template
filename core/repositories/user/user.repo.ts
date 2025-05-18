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

  async signin(data: { email: string }): Promise<UserDto> {
    const { email } = data;
    return await this.db.transaction(async (tx) => {
      try {
        const user = await tx.query.usersTable.findFirst({
          where: eq(usersTable.email, email),
        });

        if (!user) {
          throw new Error("Invalid credentials");
        }

        return UserDto.fromDb(user);
      } catch (error) {
        throw new Error("Failed to login", {
          cause: error,
        });
      }
    });
  }

  async signup(data: {
    email: string;
    hashedPassword: string;
    name: string;
  }): Promise<UserDto> {
    const { email, hashedPassword, name } = data;
    return await this.db.transaction(async (tx) => {
      try {
        const [user] = await tx
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
        throw new Error("Failed to signup", {
          cause: error,
        });
      }
    });
  }
}
