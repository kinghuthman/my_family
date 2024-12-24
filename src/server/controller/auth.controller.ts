import { Request, Response } from "express";
import { loginUser, logoutUser, registerUser } from "../services/auth.service";

const register = async (req: Request, res: Response) => {
  try {
    const { email, password, username, lastName, firstName, dateOfBirth } =
      req.body;
    const user = await registerUser({
      email,
      password,
      username,
      lastName,
      firstName,
      dateOfBirth,
    });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const result = await loginUser({ username, password });

    res.cookie("token", result.token, {
      httpOnly: true, // Prevent client-side access
      secure: process.env.NODE_ENV === "production", // Only set over HTTPS in production
      sameSite: "strict", // Prevent CSRF attacks
      maxAge: 24 * 60 * 60 * 1000, // Cookie expiry: 1 day
    });
    res.status(200).json(result);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    await logoutUser(req, res);
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Server error during logout." });
  }
};

export { login, logout, register };
