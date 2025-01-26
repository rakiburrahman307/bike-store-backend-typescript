import { NextFunction, Request, Response } from 'express';
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
const getTotalRevenue = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const totalRevenue = await orderService.calculateTotalRevenue();
    res.status(200).json({
      message: 'Revenue calculated successfully',
      success: true,
      data: {
        totalRevenue,
      },
    });
  } catch (error) {
    next(error);
  }
};
export const orderControllers = {
  createProductOrder,
  getTotalRevenue,
};
