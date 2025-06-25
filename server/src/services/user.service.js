import prisma from "../config/db.js";
import bcrypt from "bcryptjs";
import {
  uploadImage,
  deleteImage,
} from "./image.service.js";

export const getAllUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      profileImage: true,
    },
  });
};

export const getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      profileImage: true,
    },
  });
  if (!user) throw new Error("User not found");
  return user;
};

export const createUser = async (data) => {
  const { email, name, role, password, profileImage } =
    data;
  if (!email || !name || !role || !password) {
    throw new Error("Missing required fields");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  return await prisma.user.create({
    data: {
      email,
      name,
      role,
      password: hashedPassword,
      profileImage,
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      profileImage: true,
    },
  });
};

export const updateUserById = async (id, data) => {
  const { email, name, role, profileImage } = data;
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (!user) throw new Error("User not found");
  return await prisma.user.update({
    where: { id },
    data: {
      email,
      name,
      role,
      profileImage,
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      profileImage: true,
    },
  });
};

export const deleteUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (!user) throw new Error("User not found");
  await prisma.user.delete({ where: { id } });
  if (user.profileImage) {
    const publicId = `turf_booking/users/${
      user.profileImage.split("/").pop().split(".")[0]
    }`;
    await deleteImage(publicId);
  }
  return user;
};
