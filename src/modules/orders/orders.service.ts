import status from 'http-status';
import AppError from '../../errors/AppError';
import Product from '../products/product.model';

import Order from './orders.model';
import { surjoPaymentCreate } from '../../utils/surjopay';
import User from '../users/users.model';
import { TOrder } from './orders.interface';
import { verifyPayment } from '../../utils/verifyPayment';
import QueryBuilder from '../../builder/QueryBuilder';

const createOrder = async (orderData: TOrder) => {
  const session = await Product.startSession();
  session.startTransaction();

  try {
    // Iterate over the products in the order
    for (const item of orderData.products) {
      const product = await Product.findById(item.productId).session(session);

      if (!product) {
        throw new AppError(status.NOT_FOUND, `Product not found`);
      }

      // Check stock availability
      if (product.stock < item.quantity) {
        throw new AppError(
          status.BAD_REQUEST,
          `Product "${product.name}" is out of stock`,
        );
      }

      // Decrease product stock
      product.stock -= item.quantity;
      await product.save({ session });
    }

    // Fetch user data for payment details
    const user = await User.findById(orderData.userId).session(session);
    if (!user) {
      throw new AppError(status.NOT_FOUND, `User not found`);
    }

    // Create payment object
    const paymentObjet = {
      amount: orderData.totalPrice as number,
      order_id: user?._id as string,
      customer_name: user?.name as string,
      email: user?.email as string,
      customer_address: 'dhaka',
      customer_phone: '0174545455',
      customer_city: 'dhaka',
      client_ip: '127.0.0.1',
      currency: 'BDT',
    };

    // Call payment service
    const payment = await surjoPaymentCreate(paymentObjet);

    // Include payment details in the final order
    const finalOrderData = {
      ...orderData,
      payment,
    };
    // Save the order
    const order = await Order.create([finalOrderData], { session });

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    return order;
  } catch (error: any) {
    // Abort transaction on error
    await session.abortTransaction();
    session.endSession();

    // Throw error for higher-level handling
    throw new AppError(
      status.INTERNAL_SERVER_ERROR,
      error.message || 'Failed to create order',
    );
  }
};

const orderConformations = async (orderId: string) => {
  const result = await verifyPayment('SP6797d85639fed');
  if (!result || !Array.isArray(result)) {
    throw new AppError(status.INTERNAL_SERVER_ERROR, 'Invalid payment data');
  }

  // Filter payment data for the specific orderId
  const paymentData = result.find((order) => order?.order_id === orderId);
  if (!paymentData) {
    throw new AppError(status.NOT_FOUND, 'Payment not found');
  }

  // Check payment success status
  if (
    paymentData.sp_message === 'Success' &&
    paymentData.bank_status === 'Success'
  ) {
    // Update order status to 'completed'
    const order = await Order.findOneAndUpdate(
      { 'payment.sp_order_id': orderId }, // Query to match the order
      { status: 'completed' }, // Update to mark as completed
      { new: true }, // Return the updated document
    );

    if (!order) {
      throw new AppError(status.NOT_FOUND, 'Order not found');
    }

    // Decrease stock for each product
    for (const product of order.products) {
      const updatedProduct = await Product.findOneAndUpdate(
        { _id: product.productId }, // Match the product by ID
        { $inc: { stock: -product.quantity } }, // Decrease stock by the ordered quantity
        { new: true }, // Return the updated product document
      );

      if (!updatedProduct) {
        throw new AppError(
          status.NOT_FOUND,
          `Product with ID ${product.productId} not found`,
        );
      }

      // Check for insufficient stock
      if (updatedProduct.stock < 0) {
        throw new AppError(
          status.CONFLICT,
          `Insufficient stock for product ${updatedProduct.name}`,
        );
      }
    }

    return order;
  } else {
    throw new AppError(status.BAD_REQUEST, 'Payment verification failed');
  }
};
const getOrders = async (query: Record<string, unknown>) => {
  const queryBuilder = new QueryBuilder(Order.find(), query);

  const orders = await queryBuilder
    .search(['status'])
    .filter() 
    .sort() 
    .paginate() 
    .fields() 
    .modelQuery.exec(); 

  const meta = await queryBuilder.countTotal();

  return { orders, meta };
};

// calculate total revenue
const calculateTotalRevenue = async () => {
  const result = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: {
          $sum: {
            $multiply: ['$quantity', '$totalPrice'],
          },
        },
      },
    },
  ]);
  return result[0]?.totalRevenue || 0;
};
export const orderService = {
  createOrder,
  orderConformations,
  calculateTotalRevenue,
  getOrders
};
