import { Request, Response } from "express";
import { getUserProfile } from "../services/user.service";

export const getUserProfileController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const profile = await getUserProfile(userId);

    if (!profile) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
