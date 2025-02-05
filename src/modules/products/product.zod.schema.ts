import { z } from 'zod';

// Define the Product schema
const productSchema = z.object({
  body: z.object({
    userId: z.string().min(1, 'User id is required'),
    name: z.string().min(1, 'Product name is required'),
    brand: z.string().min(1, 'Brand is required'),
    description: z.string().min(1, 'Description is required'),
    rating: z.string().min(1, 'Rating is required'),
    image: z.string().optional(),
    price: z.number().nonnegative('Price must be non-negative'),
    model: z.string().optional(),
    stock: z.number().int().nonnegative('Stock must be a non-negative integer'),
  }),
});
export const productZodSchema = {
  productSchema,
};
