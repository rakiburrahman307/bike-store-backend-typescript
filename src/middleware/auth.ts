import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import status from 'http-status';
import User from '../modules/users/users.model';
import AppError from '../errors/AppError';
import { verifyToken } from '../utils/verifyToken';
import config from '../config/config';
import { TUserRole } from '../interface/role';
import { JwtPayload } from 'jsonwebtoken';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req?.headers?.authorization?.split(' ')[1];
    if (!token) {
      throw new AppError(status.UNAUTHORIZED, 'You are not authorized!');
    }
    const decoded = verifyToken(token, config.JWT_SECRET_KYE as string);
    const { userId, email, role } = decoded;

    const user = await User.findOne({ _id: userId, email: email });

    if (!user) {
      throw new AppError(status.NOT_FOUND, 'This user is not found !');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        status.UNAUTHORIZED,
        'You are not authorized to access this route!',
      );
    }
    req.user = {
      id: user._id,
      email: user.email,
      role: user.role,
    } as JwtPayload;
    next();
  });
};
export default auth;
