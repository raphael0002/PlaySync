import { Router } from "express";
import { loginSchema, signupSchema, validate } from "../validations/auth.validation.js";
import { logIn, signUp } from "../controllers/auth.controller.js";

const authRoutes = Router();

authRoutes.post("/signup",validate(signupSchema),signUp);
authRoutes.post("/login", validate(loginSchema), logIn); 

export default authRoutes;