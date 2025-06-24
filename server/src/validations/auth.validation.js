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
    .refine((val) => ['ADMIN','USER','VENDOR'].includes(val), {
      message: 'Role must be either ADMIN or USER or VENDOR',
    }),
});

// Login validation schema
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Validation middleware adapter
const validate = (schema) => (req, res, next) => {
  try {
    const parsed = schema.parse(req.body);
    req.body = parsed; // If validation passes, replace req.body with the parsed data
    next();
  } catch (error) {

    const errors = error.errors.map(err => ({ //errors inside error is an array of objects of error messages
      field: err,
      message: err.message,
    }));

    res.status(400).json({
      success: false,
      errors,
    });
  }
};

export { signupSchema, loginSchema, validate }