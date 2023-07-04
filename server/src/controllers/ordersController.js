import Orders from '../models/Orders.js';
import Users from '../models/Users.js';
import Products from '../models/Products.js';

export const createOrder = async (req,res) =>{
    try {
    const {userId,items,totalPrice,totalItems,totalQuantity,cancellable,status} = req.body;
    const {productId,quantity} = items;
    if(!userId || !items || !totalPrice || !totalItems || !totalQuantity || !productId || !quantity) return res.status(400).json({status:false,message:"please provide the required data"});
    const user = await Users.findById(userId);
    const response = await Orders.create(req.body);
    res.status(201).json({status:true,message:"success",data:response});
    } catch (error) {
    res.status(500).json({status:false,message:error.message}); 
    }
}

export const updateOrder = async (req,res) =>{
    try {
    const {orderId,status} = req.body;
    const {userId} = req.params;
    const order = await Orders.findOne({_Id:orderId,userId});
    if(!order) return res.status(404).json({status:false,message:"order not found"});
    const user = await Users.findById(userId);
    if(!user) return res.status(404).json({status:false,message:"user not found"});
    if(status==="cancled" && !order.cancellable) return res.status(404).json({status:false,message:"this order is not cancellable"});
    if(status==="cancled" && order.cancellable){
        order.isDeleted="true"
        order.deletedAt= new Date();
        order.status = status;
        await order.save()
    }
    order.status = status;
    await order.save()
    res.status(201).json({status:true,message:"success",data:order});  
    } catch (error) {
    res.status(500).json({status:false,message:error.message});  
    }
}