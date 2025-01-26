import status from 'http-status';
import AppError from '../../errors/AppError';
import User from '../users/users.model';
import { TLoginUser, TUser, TUserSign } from './auth.interface';
import bcrypt from 'bcrypt';
import { createToken } from '../../utils/createToken';
import config from '../../config/config';

// register user
const register = async (payload: TUser) => {
  //user registration logic
  const user = await User.findOne({ email: payload.email });
  if (user) {
    throw new AppError(status.BAD_REQUEST, 'This Email already exists!');
  }
  const result = await User.create(payload);
  return result;
};

// login user service
const login = async (payload: TLoginUser) => {
  const { email, password } = payload;

  //Check if user exists
  const existUser = await User.findOne({ email });
  if (!existUser) {
    throw new AppError(status.BAD_REQUEST, 'Invalid credentials!');
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, existUser?.password);
  if (!isPasswordValid) {
    throw new AppError(status.BAD_REQUEST, 'Invalid credentials!');
  }

  const userObject: TUserSign = {
    userId: existUser?._id as string,
    email: existUser?.email,
    role: existUser?.role,
  };
  // Generate JWT token
  const token = await createToken(
    userObject,
    config.JWT_SECRET_KYE as string,
    config.JWT_ACCESS_EXPIRES_IN as string,
  );

  // Return user token
  return {
    token,
  };
};

const authService = {
  register,
  login,
};

export default authService;