import { z } from 'zod';

// Signup validation schema
const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  role: z.string() // normalize the input to uppercase and validate against allowed roles
    .min(1, 'Role is required')
    .transform((val) => val.toUpperCase())
    .refine((val) => ['ADMIN', 'USER', 'VENDOR'].includes(val), {
      message: 'Role must be either ADMIN or USER or VENDOR',
    }),
});

// Login validation schema
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export { signupSchema, loginSchema }