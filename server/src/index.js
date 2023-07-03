import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import multer from 'multer';
import usersRoute from './routes/usersRoute.js';
import productsRoute from './routes/productsRoutes.js';

dotenv.config();

const app = express();

app.use(multer().any());

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser:true
}).then(()=>console.log('Database connected')).catch((error)=>console.log(error.message));

app.use('/', usersRoute);
app.use('/', productsRoute);


app.listen(process.env.PORT, () => {
    console.log(`server runing on port : ${process.env.PORT}`)
});

