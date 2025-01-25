import mongoose from 'mongoose';
import { TOrder } from './orders.interface';
const { Schema } = mongoose;

const orderSchema = new Schema<TOrder>(
  {
    email: {
      type: String,
      required: [true, 'This field is required'],
    },
    product: {
      type: String,
      required: [true, 'This field is required'],
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    totalPrice: {
      type: Number,
      min: [0, 'Number must be positive number'],
    },
  },
  { timestamps: true, versionKey: false },
);

const Order = mongoose.model<TOrder>('orders', orderSchema);

export default Order;
