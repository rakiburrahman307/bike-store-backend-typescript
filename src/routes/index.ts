import express from 'express';
import productRouter from '../modules/products/product.router';
import orderRouter from '../modules/orders/orders.router';
import authRouter from '../modules/auth/auth.router';
import userRouter from '../modules/users/users.router';

const router = express.Router();
const routes = [
  {
    path: '/products',
    route: productRouter,
  },
  {
    path: '/orders',
    route: orderRouter,
  },
  {
    path: '/auth',
    route: authRouter,
  },
  {
    path: '/users',
    route: userRouter,
  },
];

routes.forEach((element) => {
  if (element?.path && element?.route) {
    router.use(element?.path, element?.route);
  }
});

export default router;
