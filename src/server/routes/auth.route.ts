import { Router } from "express";

import { body } from "express-validator/lib/middlewares/validation-chain-builders";
import { login, logout, register } from "../controller/auth.controller";
import validateRequest from "../middleware/validateRequest";

const router = Router();

// Registration route
router.post(
  "/v1/register",
  [
    body("email").isEmail().withMessage("Please provide a valid email."),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long."),
    body("username")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long."),
    body("firstName").notEmpty().withMessage("First name is required."),
    body("lastName").notEmpty().withMessage("Last name is required."),
    body("dateOfBirth")
      .isDate()
      .withMessage("Please provide a valid date of birth."),
  ],
  validateRequest,
  register
);

// Login route
router.post(
  "/v1/login",
  [
    body("username").notEmpty().withMessage("Username is required."),
    body("password").notEmpty().withMessage("Password is required."),
  ],
  validateRequest,
  login
);

router.post("/v1/logout", validateRequest, logout);

export default router;
