import { z } from 'zod';

// Define the User schema
const userSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    phone: z.string().min(1, 'Name is required'),
    address: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.enum(['customer', 'admin']).default('customer'),
  }),
});
const updateUserSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').optional(),
    phone: z.string().min(1, 'Name is required').optional(),
    address: z.string().min(1, 'Name is required').optional(),
    email: z.string().email('Invalid email address').optional(),
    password: z.string().min(6, 'Password must be at least 6 characters').optional(),
    role: z.enum(['customer', 'admin']).default('customer').optional(),
  }),
});
export const userZodSchema = {
  userSchema,
  updateUserSchema
};
