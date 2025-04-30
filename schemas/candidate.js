import * as z from "zod";

const commonFields = {
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters'),

  phone: z
    .string()
    .min(1, 'Phone number is required')
    .max(20, 'Phone number must be less than 20 characters'),

  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address')
    .max(100, 'Email must be less than 100 characters'),

  references: z
    .string()
    .min(1, 'References are required')
    .max(500, 'References must be less than 500 characters'),

  technology: z
    .string()
    .min(1, 'Technologies are required')
    .max(500, 'Technologies must be less than 500 characters')
    .refine(
      value =>
        value
          .split(',')
          .every(tech => tech.trim().length >= 1 && tech.trim().length <= 50),
      'Each technology must be between 1-50 characters'
    )
    .refine(
      value => value.split(',').length <= 10,
      'Maximum 10 technologies allowed'
    ),

  level: z.enum(['Junior', 'Mid', 'Senior'], {
    required_error: 'Level is required',
  }),

  salaryExpectation: z
    .number({
      required_error: 'Salary expectation is required',
      invalid_type_error: 'Salary must be a number',
    })
    .min(0, 'Salary cannot be negative')
    .max(1000000, 'Salary must be reasonable'),

  experience: z
    .number({
      required_error: 'Experience is required',
      invalid_type_error: 'Experience must be a number',
    })
    .min(0, 'Experience cannot be negative')
    .max(50, 'Experience must be realistic'),

  interviewStatus: z.enum([
    'Shortlisted',
    'First Interview Complete',
    'Second Interview Complete',
    'Hired',
    'Rejected',
    'Blacklisted',
  ]).default('Shortlisted'),
};

// ✅ Create form: CV is required
export const candidateFormSchema = z.object({
  ...commonFields,
  cvFile: z
    .instanceof(File, { message: 'CV file is required' })
    .refine(file => file.size <= 5 * 1024 * 1024, 'File size must be less than 5MB')
    .refine(
      file =>
        ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type),
      'Only PDF, DOC, and DOCX files are allowed'
    ),
});

// ✅ Edit form: CV is optional (you may not upload a new one)
export const editCandidateFormSchema = z.object({
  ...commonFields,
  cvFile: z
    .any()
    .optional()
    .refine(
      file =>
        !file || file instanceof File,
      'Invalid file format'
    )
    .refine(
      file =>
        !file || file.size <= 5 * 1024 * 1024,
      'File size must be less than 5MB'
    )
    .refine(
      file =>
        !file ||
        ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type),
      'Only PDF, DOC, and DOCX files are allowed'
    ),
});
