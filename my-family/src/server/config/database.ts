import pg from "pg"; // Use the default import
const { Pool } = pg;

import dotenv from "dotenv";
dotenv.config();

// Environment variables or hardcoded for testing
const pool = new Pool({
  user: process.env.PG_USER || "",
  host: process.env.PG_HOST || "",
  database: process.env.PG_DATABASE || "",
  password: process.env.PG_PASSWORD || "",
  port: parseInt(process.env.PG_PORT || ""),
});

// Test connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
  console.log("Connected to PostgreSQL Mr. King");
  release(); // Release the client back to the pool
});

export default pool;
