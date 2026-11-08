import { Pool } from "pg";
import { logger } from "../logger/logger";

let pool: Pool | null = null;

export function getPool(): Pool {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) throw new Error("DATABASE_URL is empty");

    pool = new Pool({ connectionString });
    
    pool.on("error", (err) => {
      logger.error(err, "Unexpected error on idle database client");
    });
  }

  return pool;
}

export async function closePool(): Promise<void> {
  if (pool) await pool.end();
  pool = null;
}
