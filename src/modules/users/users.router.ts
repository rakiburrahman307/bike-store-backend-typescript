import express from 'express';
import { userControllers } from './users.controller';
import validateZodSchema from '../../middleware/validateZodSchema';
import { userZodSchema } from './users.zod.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from './user.constant';
const userRouter = express.Router();

// all order related routes
userRouter.get('/', auth(USER_ROLE.admin), userControllers.getAllUsers);
userRouter.delete('/:id',auth(USER_ROLE.admin), userControllers.deleteUser);
userRouter.patch(
  '/:id',
  auth(USER_ROLE.admin),
  validateZodSchema(userZodSchema.updateUserSchema),
  userControllers.updateUserData,
);

export default userRouter;
