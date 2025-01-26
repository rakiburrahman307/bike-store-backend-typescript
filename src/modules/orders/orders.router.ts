import express from 'express';
import { orderControllers } from './orders.controller';
import validateZodSchema from '../../middleware/validateZodSchema';
import { orderZodSchema } from './orders.zod.validation';
const orderRouter = express.Router();

// all order related routes
orderRouter.post('/create-order', validateZodSchema(orderZodSchema.orderSchema), orderControllers.createProductOrder);
orderRouter.get('/revenue', orderControllers.getTotalRevenue);

export default orderRouter;
