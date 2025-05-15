import {
  integer,
  pgTable,
  varchar,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

export const userRoles = pgEnum("user_role", ["admin", "user"]);

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: userRoles().default("admin").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),

  // table.increments("id").primary();
  // table.string("name").notNullable();
  // table.string("email").notNullable();
  // table.string("password").notNullable();
  // table.enum("role", ["admin", "user"]).notNullable();
  // table.timestamps(true, true);
});

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: (typeof userRoles.enumValues)[number];
};
