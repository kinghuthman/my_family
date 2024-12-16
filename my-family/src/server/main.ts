import express from "express";
import ViteExpress from "vite-express";
import pool from "./config/database.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());

app.get("/api/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res
      .status(200)
      .json({ message: "Database connected!", time: result.rows[0].now });
  } catch (err) {
    res
      .status(500)
      // @ts-ignore
      .json({ error: "Database connection error", details: err.message });
  }
});

app.get("/hello", (_, res) => {
  res.send("Hello Vite + React + TypeScript!");
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
