import { z } from 'zod';

export const addCatSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  breed: z.string().min(3, { message: "Breed must be at least 3 characters." }),
  
  years_of_experience: z.coerce
    .number({ invalid_type_error: "Years of experience must be a number." })
    .int()
    .min(0, { message: "Experience cannot be negative." }),

  salary: z.coerce
    .number({ invalid_type_error: "Salary must be a number." })
    .positive({ message: "Salary must be a positive number." }),
});

export const editSalarySchema = z.object({
  salary: z.coerce
    .number({ invalid_type_error: "Salary must be a number." })
    .positive({ message: "Salary must be a positive number." }),
});

export type AddCatFormValues = z.infer<typeof addCatSchema>;
export type EditSalaryFormValues = z.infer<typeof editSalarySchema>;