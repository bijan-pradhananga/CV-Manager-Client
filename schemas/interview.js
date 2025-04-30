import * as z from "zod"

export const interviewSchema = z.object({
  interviewerId: z.string().min(1, "Interviewer is required"),
  interviewDate: z.date({
    required_error: "Interview date is required",
  }),
  interviewTime: z.string().min(1, "Interview time is required"),
});