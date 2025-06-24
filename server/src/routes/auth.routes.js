import { Router } from "express";
import {
  loginSchema,
  signupSchema,
  validate,
} from "../validations/auth.validation.js";
import {
  logIn,
  logout,
  signUp,
  verifyToken,
} from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const authRoutes = Router();

authRoutes.post("/signup", validate(signupSchema), signUp);
authRoutes.post("/login", validate(loginSchema), logIn);

authRoutes.get("/verify", authMiddleware(), verifyToken);
authRoutes.post("/logout", authMiddleware(), logout);

export default authRoutes;
