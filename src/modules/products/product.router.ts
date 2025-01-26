import express from 'express';
import { BikeControllers } from './product.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../users/user.constant';
import validateZodSchema from '../../middleware/validateZodSchema';
import { productZodSchema } from './product.zod.schema';
const productRouter = express.Router();

// all the product related routes
productRouter.post(
  '/create-product',
  auth(USER_ROLE.admin),
  validateZodSchema(productZodSchema.productSchema),
  BikeControllers.createBikesInfo,
);
productRouter.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.customer),
  BikeControllers.getAllBikesByQuery,
);
productRouter.get(
  '/:productId',
  auth(USER_ROLE.admin, USER_ROLE.customer),
  BikeControllers.getBikeById,
);
productRouter.patch(
  '/:productId',
  auth(USER_ROLE.admin),
  BikeControllers.docUpdatedById,
);
productRouter.delete(
  '/:productId',
  auth(USER_ROLE.admin),
  BikeControllers.deleteBikeFromDB,
);

export default productRouter;
