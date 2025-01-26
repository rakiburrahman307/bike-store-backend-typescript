import status from 'http-status';
import AppError from '../../errors/AppError';
import Product from '../products/product.model';
import { TOrder } from './orders.interface';
import Order from './orders.model';

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
      if (product?.stock < item?.quantity) {
        throw new AppError(
          status.NOT_FOUND,
          `Product ${product?.name} is out of stock`,
        );
      }

      // Decrease product stock
      product.stock -= item.quantity;
      await product.save({ session });
    }

    // Create the order after stock validation and update
    const order = await Order.create([orderData], { session });

    await session.commitTransaction();
    session.endSession();

    return order;
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(status.INTERNAL_SERVER_ERROR, error);
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
