import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import CustomError from '../manageAllTypesErrors/CustomError';
import status from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config/config';
import { User } from '../modules/user/user.model';
import { TRole } from '../modules/user/user.interface';

const authValidation = (...requiredRoles: TRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req?.headers?.authorization?.split(' ')[1];
    if (!token) {
      throw new CustomError(status.UNAUTHORIZED, 'You are not authorized!');
    }
    const decoded = jwt.verify(
      token,
      config.JWT_SECRET_KEY as string,
    ) as JwtPayload;

    const { _id, email, role } = decoded;

    const user = await User.findOne({ _id: _id, email: email });

    if (!user) {
      throw new CustomError(status.NOT_FOUND, 'This user is not found !');
    }

    const userIsBlocked = user?.isBlocked;

    if (userIsBlocked) {
      throw new CustomError(status.FORBIDDEN, 'This user is blocked !');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new CustomError(
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
export default authValidation;
