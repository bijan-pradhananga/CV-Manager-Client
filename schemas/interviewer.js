import * as z from "zod";

export const InterviewerSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters long",
  }),
  email: z.string().email({
    message: "A valid email is required",
  }),
});