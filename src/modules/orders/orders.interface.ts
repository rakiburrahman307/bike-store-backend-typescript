import mongoose from 'mongoose';
// Payment Interface
export interface IPayment {
  checkout_url?: string;
  amount?: number;
  currency?: string;
  sp_order_id?: string;
  customer_order_id?: string;
  customer_name?: string;
  customer_address?: string;
  customer_city?: string;
  customer_phone?: string;
  customer_email?: string | null;
  client_ip?: string;
  intent?: string;
  transactionStatus?: string;
}
export interface TOrder extends Document {
  userId: mongoose.Types.ObjectId;
  products: {
    productId: mongoose.Types.ObjectId;
    quantity: number;
    price: number;
  }[];
  totalPrice: number;
  payment: IPayment;
  status: 'pending' | 'completed' | 'canceled';
}
