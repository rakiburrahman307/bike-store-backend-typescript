import express from 'express';
import { userControllers } from './users.controller';
import validateZodSchema from '../../middleware/validateZodSchema';
import { userZodSchema } from './users.zod.validation';
const orderRouter = express.Router();

// all order related routes
orderRouter.get('/', userControllers.getAllUsers);
orderRouter.delete('/:id', userControllers.deleteUser);
orderRouter.patch(
  '/:id',
  validateZodSchema(userZodSchema.updateUserSchema),
  userControllers.updateUserData,
);

export default orderRouter;
