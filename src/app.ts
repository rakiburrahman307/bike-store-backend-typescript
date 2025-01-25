import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './globalErrorHandler/globalErrorHandler';
import router from './routes';
import { notFound } from './middleware/notFound';
import status from 'http-status';
const app: Application = express();

// middleware
app.use(express.json());
app.use(cors());

// define routes
app.use('/api/v1', router);

// home page welcome Message
app.get('/', (req: Request, res: Response) => {
  res.status(status.OK).json({
    status: status.OK,
    success: true,
    message: 'Welcome to the Bike Store API!',
  });
});
// if any route not found
app.use(notFound);
// Error-Handling Middleware
app.use(globalErrorHandler);

export default app;
