import { Router } from "express";
import { loginSchema, signupSchema } from "../validations/auth.validation.js";
import { logIn, signUp } from "../controllers/auth.controller.js";
import validate from "../validations/validate.js";

const authRoutes = Router();

authRoutes.post("/signup", validate(signupSchema), signUp);
authRoutes.post("/login", validate(loginSchema), logIn);

export default authRoutes;