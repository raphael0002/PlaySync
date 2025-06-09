import dotenv from 'dotenv';

dotenv.config();

export const jwtSecret = process.env.JWT_SECRET_KEY;
export const jwtExpiration = process.env.JWT_EXPIRATION_TIME;
export const bcryptSaltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);