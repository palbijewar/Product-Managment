import express from 'express';
import {cart,deleteCart,getCart,updateCart} from '../controllers/cartsController.js';
import {auth,auth2} from '../milddlewares/auth.js';
const router = express.Router();

router.post('/users/:userId/cart',auth,auth2, cart);
router.put('/users/:userId/cart',auth,auth2, updateCart);
router.get('/users/:userId/cart', auth,auth2, getCart);
router.delete('/users/:userId/cart', auth,auth2,deleteCart)

export default router;