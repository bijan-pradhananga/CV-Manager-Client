import * as z from "zod"

export const LoginSchema = z.object({
    email: z.string().email({
      message: "A valid email is required",
    }),
    password: z.string().min(1, {
      message: "Password is required",
    }),
  });

export const RegisterSchema = z.object({
    name: z.string().min(2, {
      message: 'Name is required',
    }),
    email: z.string().email({
      message: 'Email is required',
    }),
    password: z
      .string()
      .min(6, {
        message: 'Password must be at least 6 characters long',
      })
      .regex(/[A-Z]/, {
        message: 'Password must include at least one uppercase letter',
      })
      .regex(/[a-z]/, {
        message: 'Password must include at least one lowercase letter',
      })
      .regex(/[0-9]/, {
        message: 'Password must include at least one number',
      })
      .regex(/[\W_]/, {
        message: 'Password must include at least one special character',
      }),
  });
  