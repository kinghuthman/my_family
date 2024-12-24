import { Router } from "express";
import { getUserProfileController } from "../controller/user.controller";
import validateRequest from "../middleware/validateRequest";

const router = Router();

router.get("/v1/:userId", validateRequest, getUserProfileController);

export default router;
