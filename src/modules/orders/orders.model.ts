import mongoose, { Model, Schema } from 'mongoose';
import { TOrder } from './orders.interface';

const orderSchema: Schema<TOrder> = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'completed', 'canceled'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Create and export the Order model
const Order: Model<TOrder> = mongoose.model<TOrder>('Order', orderSchema);
export default Order;
