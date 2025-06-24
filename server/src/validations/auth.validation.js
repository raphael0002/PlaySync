import { z } from "zod";

// Signup validation schema
const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(
      /[A-Z]/,
      "Password must contain at least one uppercase letter"
    )
    .regex(
      /[a-z]/,
      "Password must contain at least one lowercase letter"
    )
    .regex(
      /[0-9]/,
      "Password must contain at least one number"
    ),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .optional(),
  role: z.enum(["ADMIN", "VENDOR", "USER"], {
    message: "Role must be ADMIN, VENDOR, or USER",
  }),
});

// Login validation schema
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

// Validation middleware adapter
const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    const errors = error.errors.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));

    res.status(400).json({
      success: false,
      errors,
    });
  }
};

export { signupSchema, loginSchema, validate };
