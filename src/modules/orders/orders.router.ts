import express from 'express';
import { orderControllers } from './orders.controller';
const orderRouter = express.Router();

// all order related routes
orderRouter.post('/create-order', orderControllers.createProductOrder);
orderRouter.get('/revenue', orderControllers.getTotalRevenue);

export default orderRouter;
