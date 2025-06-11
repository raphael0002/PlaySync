import prisma from "../config/db.js";
import { hashPassword, comparePassword, generateToken } from "../utils/auth.utils.js";
import { NotFoundError, BadRequestError } from "../utils/error.utils.js";

const signup = async (data) => {

  const { email, password, name, role } = data;
  
  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    throw new BadRequestError('Email already in use');
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role:role
    },
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
    },
  });

  // Generate token
  const token = generateToken(user.id);

  return { user, token };
};

const login = async ({ email, password }) => {
  // Find user by email
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new BadRequestError('Invalid credentials');
  }

  // Compare passwords
  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    throw new BadRequestError('Invalid credentials');
  }

  // Generate token
  const token = generateToken(user.id);

  // Return user data (excluding password)
  const userData = {
    id: user.id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt,
  };

  return { user: userData, token };
};

export {signup, login};