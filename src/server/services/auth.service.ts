import bcrypt from "bcrypt";
import { isValid } from "date-fns";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import pool from "../config/database.ts";

dotenv.config();

export type UserRegistration = {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  userId: string;
  password: string;
};
export type UserDetails = {
  email: string;
  firstName: string;
  lastName: string;
  // todo: correct type
  dateOfBirth: string;
  user_id: string;
  password: string;
  id: string;
  // todo: correct type
  created_at: string;
};

export type LoginRequest = {
  userId: string;
  password: string;
};

const registerUser = async ({
  userId,
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
      "INSERT INTO users (user_id, first_name, last_name, email, password, date_of_birth) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, user_id, email, created_at";
    const values = [
      userId,
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

const loginUser = async ({ userId, password }: LoginRequest) => {
  const query = "SELECT * FROM users WHERE user_id = $1";
  const { rows } = await pool.query(query, [userId]);

  if (rows.length === 0) throw new Error("User not found");

  const user: UserDetails = rows[0];
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) throw new Error("Invalid password");

  const token = jwt.sign(
    { id: user.id, userId: user.user_id },
    process.env.JWT_SECRET as string,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
  console.log(user);
  return { token, user: { userId: user.user_id, id: user.id } };
};

export { loginUser, registerUser };
