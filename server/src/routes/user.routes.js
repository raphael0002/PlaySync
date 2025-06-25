import { Router } from "express";
import { getAllUsers, getUser, updateUser, deleteUser } from "../controllers/user.controller.js";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.get("/:id", getUser);
userRoutes.patch("/:id", updateUser);
userRoutes.delete("/:id", deleteUser);

export default userRoutes;