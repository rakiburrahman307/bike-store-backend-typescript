import express from 'express';
import { BikeControllers } from './product.controller';
const productRouter = express.Router();

// all the product related routes
productRouter.post('/create-product', BikeControllers.createBikesInfo);
productRouter.get('/', BikeControllers.getAllBikesByQuery);
productRouter.get('/:productId', BikeControllers.getBikeById);
productRouter.put('/:productId', BikeControllers.docUpdatedById);
productRouter.delete('/:productId', BikeControllers.deleteBikeFromDB);

export default productRouter;
