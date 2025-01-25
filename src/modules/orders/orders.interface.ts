import mongoose from 'mongoose';

export interface TOrder extends Document {
  userId: mongoose.Types.ObjectId;
  products: {
    productId: mongoose.Types.ObjectId;
    quantity: number;
    price: number;
  }[];
  totalPrice: number;
  status: 'pending' | 'completed' | 'canceled';
}
