import * as z from "zod";

export const assessmentSchema = z.object({
  assessmentType: z.string().min(1, "Assessment type is required"),
  evaluation: z.string().min(1, "Evaluation is required"),
  testFile: z.instanceof(File, {
    message: "Assessment file is required"
  }).refine(
    file => ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'].includes(file.type),
    "Only PDF, DOC, DOCX, and TXT files are accepted"
  ),
  remarks: z.string().optional()
});