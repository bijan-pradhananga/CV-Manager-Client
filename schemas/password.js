import { z } from "zod";

// Define schema for password change validation
export const passwordSchema = z.object({
    email: z.string().email(),
    currentPassword: z.string().min(6, "Current password is required"),
    newPassword: z .string()
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