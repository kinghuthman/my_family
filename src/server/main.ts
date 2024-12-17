import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import ViteExpress from "vite-express";
import pool from "./config/database.js";
import authenticate from "./middleware/verifyJwt.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/api/test-db", authenticate, async (req, res) => {
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

app.use("/api/auth", authRoutes);

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
