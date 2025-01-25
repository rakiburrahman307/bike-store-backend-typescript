import { z } from 'zod';

// Define the Order schema
const orderSchema = z.object({
  body: z.object({
    userId: z.string().min(1, 'User ID is required'),
    products: z
      .array(
        z.object({
          productId: z.string().min(1, 'Product ID is required'),
          quantity: z
            .number()
            .int()
            .positive('Quantity must be a positive integer'),
          price: z.number().nonnegative('Price must be non-negative'),
        }),
      )
      .min(1, 'At least one product is required'),
    totalPrice: z.number().nonnegative('Total price must be non-negative'),
    status: z.enum(['pending', 'completed', 'canceled']).default('pending'),
  }),
});

export const orderZodSchema = {
  orderSchema,
};
