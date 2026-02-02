import { Pool } from "pg";
import { attachDatabasePool } from "@vercel/functions";

// Connection pooling helper for stability.

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
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
