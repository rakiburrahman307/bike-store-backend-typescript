import { BikeService } from '../products/product.service';
import { TOrder } from './orders.interface';
import Order from './orders.model';

const createOrder = async (orderData: TOrder) => {
  const order = await Order.create(orderData);
  return order;
};
const validateAndUpdateBikeInfo = async (
  productId: string,
  quantity: number,
) => {
  // Find the bike by ID
  const bike = await BikeService.findBikeById(productId);
  // check the bike found or not found
  if (!bike) {
    throw new Error('Bike not found');
  }
  // Check if sufficient stock is available
  if (bike?.quantity < quantity) {
    throw new Error('Stock not available');
  }

  // Reduce the bike quantity
  const newQuantity = bike.quantity - quantity;

  // Update the bike's quantity and inStock status
  await BikeService.updateDoc(productId, {
    quantity: newQuantity,
    inStock: newQuantity > 0,
  });

  return bike;
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
  validateAndUpdateBikeInfo,
  calculateTotalRevenue,
};
