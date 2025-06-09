import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { bcryptSaltRounds, jwtExpiration, jwtSecret } from '../config/auth.js';

const hashPassword = async (password) => {
    return bcrypt.hash(password, bcryptSaltRounds);
};

const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

const generateToken = (userId) => {
  return jwt.sign({ userId }, jwtSecret, { expiresIn: jwtExpiration });
};

const verifyToken = (token) => {
  return jwt.verify(token, jwtSecret);
};

export {hashPassword,comparePassword,generateToken,verifyToken};