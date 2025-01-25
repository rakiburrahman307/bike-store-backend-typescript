import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import config from '../config/config';
import processError from './processError';


export const globalErrorHandler: ErrorRequestHandler = (
  error: any,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  // Process the all error function
  const { statusCode, message, errorSources } = processError(error);

  // Respond with a consistent error structure
  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    error: errorSources,
    stack: config.NODE_ENV === 'development' ? error?.stack : undefined,
  });
};

export default globalErrorHandler;