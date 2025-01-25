import express, { Application } from 'express';
import cors from 'cors';
import globalErrorHandler from './globalErrorHandler/globalErrorHandler';
import router from './routes';
import { notFound } from './middleware/notFound';
const app: Application = express();

// middleware
app.use(express.json());
app.use(cors());

// define routes
app.use('/api/v1', router);

// home page welcome Message
app.use(notFound);
// if any route not found

// Error-Handling Middleware
app.use(globalErrorHandler);

export default app;
