import mongoose, { Schema, Model } from 'mongoose';
import { TProduct } from './product.interface';

// Define the Product schema
const productSchema: Schema<TProduct> = new Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    model: { type: String },
    stock: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Create and export the Product model
const Product: Model<TProduct> = mongoose.model<TProduct>(
  'Product',
  productSchema,
);
export default Product;
