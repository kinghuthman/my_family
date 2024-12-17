import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/auth.service";

const register = async (req: Request, res: Response) => {
  try {
    const { email, password, userId, lastName, firstName, dateOfBirth } =
      req.body;
    const user = await registerUser({
      email,
      password,
      userId,
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
    const { userId, password } = req.body;
    const result = await loginUser({ userId, password });
    res.status(200).json(result);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};

export { login, register };
