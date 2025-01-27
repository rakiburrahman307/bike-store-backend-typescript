import mongoose from "mongoose";

// Define the Product interface
export interface TProduct {
  userId: mongoose.Types.ObjectId
  name: string;
  image?: string;
  brand: string;
  price: number;
  model: string;
  stock: number;
}
