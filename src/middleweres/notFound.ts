import { Request, Response, RequestHandler } from 'express';
import status from 'http-status';

export const notFound: RequestHandler = (req: Request, res: Response) => {
  res.status(status.NOT_FOUND).json({
    status: status.NOT_FOUND,
    message: 'Page Not Found',
  });
};
