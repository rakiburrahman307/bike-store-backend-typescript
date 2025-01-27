import express from 'express';
import { orderControllers } from './orders.controller';
import validateZodSchema from '../../middleware/validateZodSchema';
import { orderZodSchema } from './orders.zod.validation';
import { USER_ROLE } from '../users/user.constant';
import auth from '../../middleware/auth';
const orderRouter = express.Router();

// all order related routes
orderRouter.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.customer),
  orderControllers.getOrders,
);
orderRouter.post(
  '/create-order',
  auth(USER_ROLE.admin, USER_ROLE.customer),
  validateZodSchema(orderZodSchema.orderSchema),
  orderControllers.createProductOrder,
);
orderRouter.get(
  '/revenue',
  auth(USER_ROLE.admin),
  orderControllers.getTotalRevenue,
);

orderRouter.get('/shurjopay-response', orderControllers.verifyPayment);

export default orderRouter;
