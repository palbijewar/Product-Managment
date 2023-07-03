import express from 'express';
import {products,getProducts,getProduct,updateProduct,removeProduct} from '../controllers/productsController.js';
import AWS from 'aws-sdk';
const router = express.Router();

AWS.config.update({
    accessKeyId: "AKIAY3L35MCRZNIRGT6N",
    secretAccessKey: "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",
    region: "ap-south-1"
})

router.post('/products', products);
router.get('/products', getProducts);
router.get('/products/:productId', getProduct);
router.put('/products/:productId', updateProduct);
router.delete('/products/:productId', removeProduct);

export default router;