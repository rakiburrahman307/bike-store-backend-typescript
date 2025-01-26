import express from 'express';
import authController from './auth.controller';
import validateZodSchema from '../../middleware/validateZodSchema';
import authZodSchema from './auth.zod.validation';

const authRouter = express.Router();

// all auth related routes
authRouter.post(
  '/create-user',
  validateZodSchema(authZodSchema.registerUserSchema),
  authController.registerUser,
);
authRouter.post(
  '/login',
  validateZodSchema(authZodSchema.loginSchema),
  authController.loginUser,
);

export default authRouter;
