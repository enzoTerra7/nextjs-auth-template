import "server-only";

/**
 * @description
 * This is the database connection for the application.
 * It is used to connect to the database and execute queries.
 * It is a singleton and is used in the entire application.
 */
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { dbSchema } from "./table";
/**
 * @description
 * In this example, we are using the drizzle library to connect to the database
 * and execute queries.
 * The database is a PostgreSQL database
 *
 * @see https://drizzle.dev/docs/overview
 */

const sql = neon(process.env.DATABASE_URL as string);
const db = drizzle({ client: sql, schema: dbSchema });

export { db };
