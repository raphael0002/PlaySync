import { Router } from "express";
import multer from "multer";
import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const upload = multer({ dest: "uploads/" });
const userRoutes = Router();

userRoutes.get("/", authMiddleware(["ADMIN"]), getAllUsers);
userRoutes.post(
  "/",
  authMiddleware(["ADMIN"]),
  upload.single("profileImage"),
  createUser
);
userRoutes.get(
  "/:id",
  authMiddleware(["USER", "ADMIN", "VENDOR"]),
  getUser
);
userRoutes.patch(
  "/:id",
  authMiddleware(["USER", "ADMIN", "VENDOR"]),
  upload.single("profileImage"),
  updateUser
);
userRoutes.delete(
  "/:id",
  authMiddleware(["ADMIN"]),
  deleteUser
);

export default userRoutes;
