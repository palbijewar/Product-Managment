import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const cartSchema = new Schema({
    userId: {
        type:Schema.Type.ObjectId,
        ref :'User' , 
        required:true, 
        unique:true
    },
    items: [{
      productId: {
        type:Schema.Type.ObjectId,
        ref :'Product', 
        required:true, 
    },
      quantity: {
        type:Number, 
        required:true, 
        minlength: 1}
    }],
    totalPrice: {
        type:Number, 
        required:true,  
        comment: "Holds total price of all the items in the cart"
    },
    totalItems: {
        type:Number, 
        required:true, 
        comment: "Holds total number of items in the cart"
    },
}, {timestamps:true});

const Carts = model('Cart', cartSchema);

export default Carts;