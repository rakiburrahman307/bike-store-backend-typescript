import mongoose, { Model, Schema } from 'mongoose';
import { TOrder } from './orders.interface';
const paymentSchema = new mongoose.Schema({
  checkout_url: { type: String, default: null }, 
  amount: { type: Number, default: 0 }, 
  currency: { type: String, default: null }, 
  sp_order_id: { type: String, default: null },
  customer_order_id: { type: String, default: null },
  customer_name: { type: String, default: null }, 
  customer_address: { type: String, default: null }, 
  customer_city: { type: String, default: null }, 
  customer_phone: { type: String, default: null }, 
  customer_email: { type: String, default: null }, 
  client_ip: { type: String, default: null }, 
  intent: { type: String, default: null }, 
  transactionStatus: { type: String, default: null }, 
});
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
    payment: paymentSchema, 
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
