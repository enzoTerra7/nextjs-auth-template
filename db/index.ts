import "server-only";

/**
 * @description
 * This is the database connection for the application.
 * It is used to connect to the database and execute queries.
 * It is a singleton and is used in the entire application.
 */
import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";
import { dbSchema } from "./table";
/**
 * @description
 * In this example, we are using the drizzle library to connect to the database
 * and execute queries.
 * The database is a PostgreSQL database
 *
 * @see https://drizzle.dev/docs/overview
 */

const sql = new Pool({
  connectionString:
    process.env.NODE_ENV === "test"
      ? process.env.TESTING_DATABASE_URL
      : process.env.DATABASE_URL,
});
const db = drizzle({ client: sql, schema: dbSchema });

export { db };

export type DrizzleDatabase = typeof db;
