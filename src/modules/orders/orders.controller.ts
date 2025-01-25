import { NextFunction, Request, Response } from 'express';
import { validationByZodSchema } from './orders.zod.validation';
import { TOrder } from './orders.interface';
import { orderService } from './orders.service';

const createProductOrder = async (
  req: Request<TOrder>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const orderData = req.body;
    // validation by zod { product, quantity }
    const zodValidation = validationByZodSchema.parse(orderData);

    await orderService.validateAndUpdateBikeInfo(
      zodValidation.product,
      zodValidation.quantity,
    );

    // Create the order
    const newOrder = await orderService.createOrder(zodValidation);

    // Respond with success
    res.status(201).json({
      message: 'Order created successfully',
      success: true,
      data: newOrder,
    });
  } catch (error) {
    next(error);
  }
};

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
