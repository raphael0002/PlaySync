import { Router } from "express";
import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const userRoutes = Router();

// Admin-only route to get all users
userRoutes.get("/", authMiddleware(["ADMIN"]), getAllUsers);

// Routes accessible to the user themselves or admin
userRoutes.get(
  "/:id",
  authMiddleware(["USER", "ADMIN", "VENDOR"]),
  getUser
);
userRoutes.patch(
  "/:id",
  authMiddleware(["USER", "ADMIN", "VENDOR"]),
  updateUser
);
userRoutes.delete(
  "/:id",
  authMiddleware(["ADMIN"]),
  deleteUser
);

export default userRoutes;
