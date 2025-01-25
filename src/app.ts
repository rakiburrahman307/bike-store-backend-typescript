import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './modules/products/product.router';

import orderRouter from './modules/orders/orders.router';
import globalErrorHandler from './globalErrorHandler/globalErrorHandler';
const app: Application = express();

// middleware
app.use(express.json());
app.use(cors());

// define routes
app.use('/api', router);
app.use('/api', orderRouter);

// home page welcome Message
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Welcome to the Bike Store API!',
    status: 200,
  });
});
// if any route not found

// Error-Handling Middleware
app.use(globalErrorHandler);

export default app;
