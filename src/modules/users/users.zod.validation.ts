import { z } from 'zod';

// Define the User schema
const userSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.enum(['customer', 'admin']).default('customer'),
  }),
});
export const userZodSchema = {
  userSchema,
};
