import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
    fname: {
        type:String,
        required:true
    },
    lname: {
        type:String,
        required:true
    },
    email: { 
        type:String,
        required:true, 
        unique:true
    },
    profileImage: {
        type:String,
        required:true
    },
    phone: {
        type:String,
        required:true, 
        unique:true 
    }, 
    password: {
        type:String,
        required:true, 
        minlength: 8, 
        // maxlength: 15
    }, 
    address: {
      shipping: {
        street: {
            type:String,
        required:true
        },
        city: {
            type:String,
        required:true
        },
        pincode: {
            type:Number,
        required:true
        }
      },
      billing: {
        street: {
            type:String,
        required:true
        },
        city: {
            type:String,
        required:true
        },
        pincode: {
            type:Number,
        required:true
        }
    }
}
}, {timestamps:true});

const Users = model('User', userSchema);

export default Users;