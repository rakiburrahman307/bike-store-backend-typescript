import { orderService } from './orders.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import status from 'http-status';

const getOrders = catchAsync(async (req, res) => {
  const result = await orderService.getOrders(req?.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: 'Orders retrieved successfully',
    success: true,
    data: result.orders,
    meta: result.meta
  });
});

const createProductOrder = catchAsync(async (req, res) => {
  const result = await orderService.createOrder(req?.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: 'Order created successfully',
    success: true,
    data: result,
  });
});

const verifyPayment = catchAsync(async (req, res) => {
  const { order_id } = req.query;
  const result = await orderService.orderConformations(order_id as string);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: 'Payment verified successfully',
    success: true,
    data: result,
  });
});
// get total revenue from all orders
const getTotalRevenue = catchAsync(async (req, res) => {
  const totalRevenue = await orderService.calculateTotalRevenue();
  sendResponse(res, {
    statusCode: status.CREATED,
    message: 'Order created successfully',
    success: true,
    data: {
      totalRevenue,
    },
  });
});

export const orderControllers = {
  createProductOrder,
  getTotalRevenue,
  verifyPayment,
  getOrders,
};
