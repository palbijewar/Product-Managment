import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import multer from 'multer';
import usersRoute from './routes/usersRoute.js';
import productsRoute from './routes/productsRoutes.js';
import cartsRoute from './routes/cartsRouter.js';
import ordersRoute from './routes/ordersRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use(multer().any());

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser:true
}).then(()=>console.log('Database connected')).catch((error)=>console.log(error.message));

app.use('/', usersRoute);
app.use('/', productsRoute);
app.use('/', cartsRoute);
app.use('/', ordersRoute);

app.listen(process.env.PORT || 4000, () => {
    console.log(`server runing on port : ${process.env.PORT}`)
});

