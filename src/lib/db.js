import { Pool } from "pg";
import { attachDatabasePool } from "@vercel/functions";

// Connection pooling helper for stability.

const pool = new Pool({
  connectionString:
    process.env.POSTGRES_URL ||
    process.env.DATABASE_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.DATABASE_URL_UNPOOLED,
  // optional: keep these conservative for serverless
  max: 5,
  idleTimeoutMillis: 5000,
});

if (typeof attachDatabasePool === "function") {
  attachDatabasePool(pool);
}


export async function query(text, params) {
  const client = await pool.connect();
  try {
    return await client.query(text, params);
  } finally {
    client.release();
  }
}
