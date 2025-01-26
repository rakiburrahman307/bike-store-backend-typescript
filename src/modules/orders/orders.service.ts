import status from 'http-status';
import AppError from '../../errors/AppError';
import Product from '../products/product.model';
import { TOrder } from './orders.interface';
import Order from './orders.model';
import { surjoPaymentCreate } from '../../utils/surjopay';
import User from '../users/users.model';

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
  calculateTotalRevenue,
};
