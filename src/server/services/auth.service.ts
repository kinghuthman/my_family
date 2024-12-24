import bcrypt from "bcrypt";
import { isValid } from "date-fns";
import dotenv from "dotenv";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import pool from "../config/database.ts";

dotenv.config();

export type UserRegistration = {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  username: string;
  password: string;
};
export type UserDetails = {
  email: string;
  firstName: string;
  lastName: string;
  // todo: correct type
  dateOfBirth: string;
  username: string;
  password: string;
  id: string;
  // todo: correct type
  created_at: string;
};

export type LoginRequest = {
  username: string;
  password: string;
};

const registerUser = async ({
  username,
  firstName,
  lastName,
  email,
  password,
  dateOfBirth,
}: UserRegistration) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const parsedDOB = new Date(dateOfBirth).toISOString().split("T")[0];
    if (!isValid(new Date(parsedDOB))) {
      console.log(parsedDOB);
      throw new Error("Invalid date format. Use YYYY-MM-DD.");
    }
    const query =
      "INSERT INTO users (username, first_name, last_name, email, password, date_of_birth) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, username, email, created_at";
    const values = [
      username,
      firstName,
      lastName,
      email,
      hashedPassword,
      parsedDOB.toString().split("T")[0],
    ];

    const result = await pool.query(query, values);

    console.log("User Registered", result.rows[0]);
  } catch (error) {
    // @ts-ignore
    console.error("Error registering user:", error.message);
  }
};

const loginUser = async ({ username, password }: LoginRequest) => {
  const query = "SELECT * FROM users WHERE username = $1";
  const { rows } = await pool.query(query, [username]);

  if (rows.length === 0) throw new Error("User not found");

  const user: UserDetails = rows[0];
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) throw new Error("Invalid password");

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET as string,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
  console.log(user);
  return { token, user: { username: user.username, id: user.id } };
};

const logoutUser = async (req: Request, res: Response) => {
  try {
    // Clear the JWT stored in the cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Ensure secure cookies in production
      sameSite: "strict", // Add sameSite for security
    });

    return res.status(200).json({ message: "Successfully logged out." });
  } catch (error) {
    console.error("Logout error:", error);
    throw new Error("Server error during logout.");
  }
};

export { loginUser, logoutUser, registerUser };
