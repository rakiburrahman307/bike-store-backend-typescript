import { z } from 'zod';

// Zod for validating order creation
export const validationByZodSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .nonempty({ message: 'Email is required' }),
  product: z.string().nonempty({ message: 'Product ID is required' }),
  quantity: z
    .number()
    .min(1, { message: 'Quantity must be at least 1' })
    .nonnegative({ message: 'Quantity cannot be negative' }),
  totalPrice: z
    .number()
    .min(0, { message: 'Total price must be a positive number' })
    .nonnegative({ message: 'Total price cannot be negative' }),
});
