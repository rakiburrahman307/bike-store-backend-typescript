import { orderService } from './orders.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import status from 'http-status';

const createProductOrder = catchAsync(async (req, res) => {
  const result = await orderService.createOrder(req?.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: 'Order created successfully',
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
};
