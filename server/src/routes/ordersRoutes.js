import express from 'express';
import {createOrder, updateOrder,} from '../controllers/ordersController.js';
import {auth,auth2} from '../milddlewares/auth.js';
import { updateCart } from '../controllers/cartsController.js';

const router = express.Router();

router.post('/users/:userId/orders',auth,auth2, createOrder);
router.put('/users/:userId/orders',auth,auth2, updateOrder);

export default router;