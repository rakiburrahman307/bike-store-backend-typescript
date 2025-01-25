import { ZodError } from 'zod';
import status from 'http-status';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';
import AppError from '../errors/AppError';
const processError = (err: any) => {
  if (err instanceof ZodError) return handleZodError(err);
  if (err?.name === 'validationError') return handleValidationError(err);
  if (err?.name === 'CastError') return handleCastError(err);
  if (err?.code === 11000) return handleDuplicateError(err);
  if (err instanceof AppError) {
    return {
      statusCode: err?.statusCode,
      message: err?.message,
      errorSources: [{ path: '', message: err?.message }],
    };
  }
  if (err instanceof Error) {
    return {
      statusCode: status.BAD_REQUEST,
      message: err?.message,
      errorSources: [{ path: '', message: err?.message }],
    };
  }
  return {
    statusCode: status.INTERNAL_SERVER_ERROR,
    message: 'Something went wrong!',
    errorSources: [],
  };
};

export default processError;
