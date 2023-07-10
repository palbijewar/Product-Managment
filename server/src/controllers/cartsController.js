import Cart from '../models/Carts.js';
import User from '../models/Users.js';
import Product from '../models/Products.js';
import mongoose from 'mongoose';

export const getCart = async (req, res) => {
    try {
        const { userId } = req.params

        const isUser = await User.findById(userId)

        if (!isUser) return res.status(404).json({status: false, message: "User Not Found!!!"})

        const cart = await Cart.findOne({userId : userId})

        if(!cart) return res.status(404).json({status : false, message : "Cannot found Cart !!!"})

        res.status(200).json({status : true, message : "Success", data : cart})

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}




export const cart = async (req, res) => {
    try {
        const { userId } = req.params;
        const { productId, cartId, removeProduct } = req.body;
    

        if (!mongoose.isValidObjectId(userId)) {
            return res.status(400).json({ status: false, message: "Invalid user ID" });
          }
      
          if (!mongoose.isValidObjectId(productId)) {
            return res.status(400).json({ status: false, message: "Invalid product ID" });
          }
      
          if (!mongoose.isValidObjectId(cartId)) {
            return res.status(400).json({ status: false, message: "Invalid cart ID" });
          }
      
          const isUser = await User.findById(userId);
      
          if (!isUser) {
            return res.status(404).json({ status: false, message: "User Not Found!!!" });
          }
      
          const isCart = await Cart.findById(cartId);
      
          if (!isCart) {
            return res.status(404).json({ status: false, message: "Cart Not Found!!!" });
          }
      

        if (!isUser) return res.status(404).json({status: false, message: "User Not Found!!!"})

        if(!isProduct) return res.status(404).json({status : false, message : "Product Not FOund !!!"})

        if(!isCart){
            
            const cart = new Cart({
                userId,
                items,
                totalPrice,
                totalItems
            })
            await cart.save()

            res.status(201).json({status : true, message : "Success", data : cart})
            
        }else{

            const existingItem = isCart.items.find((item) => item.productId.toString() === productId);

            if (existingItem) {
              existingItem.quantity += 1;
          
            } else {
                isCart.items.push({ productId, quantity });
            }

            isCart.totalPrice += Number(totalPrice) * quantity
            isCart.totalItems += Number(quantity)

            await isCart.save()

            res.status(201).json({status : true, message : "Success", data : isCart})

        }


    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}






export const updateCart = async (req, res) => {
    try {
        const {
            userId
        } = req.params
        const {
            productId,
            cartId,
            removeProduct
        } = req.body

        
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                status: false,
                message: 'Invalid userId',
            });
        }

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({
                status: false,
                message: 'Invalid productId',
            });
        }

        if (!mongoose.Types.ObjectId.isValid(cartId)) {
            return res.status(400).json({
                status: false,
                message: 'Invalid cartId',
            });
        }


        const isUser = await User.findById(userId)

        if (!isUser) return res.status(404).json({
            status: false,
            message: "No User Found !!!"
        })

        const isCart = await Cart.findById(cartId)

        if (!isCart) return res.status(404).json({
            status: false,
            message: "No Cart Found !!!"
        })


        const existingItem = isCart.items.find((item) => item.productId.toString() === productId)

        if (!existingItem) {
            return res.status(404).json({
                status: false,
                message: "Product Not Found in Cart!!!"
            });
        }

        if (removeProduct) {
            isCart.items = isCart.items.filter((item) => item.productId.toString() !== productId);

        } else {

            if(existingItem.quantity <= 1){
                isCart.items = isCart.items.filter((item) => item.productId.toString() !== productId)
            }else{
                if (existingItem.quantity > 0) {
                    existingItem.quantity -= 1
                    if(isCart.totalPrice > 0){
                        isCart.totalPrice -= (isCart.totalPrice) / (existingItem.quantity)
                    }
                    if(isCart.totalItems  > 0){
                        isCart.totalItems -= (existingItem.quantity)
                    }
                }
            }
            
        }

        await isCart.save()

        return res.status(200).json({
            status: true,
            isCart
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}



export const deleteCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    // Make sure the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the user already has a cart
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    // Clear the cart by emptying the items array, setting totalItems to 0, and totalPrice to 0
    cart.items = [];
    cart.totalItems = 0;
    cart.totalPrice = 0;
    // Save the updated cart
    await cart.save();

    res.status(200).json({status:true, message:"success", data:cart });
  } catch (error) {
    res.status(500).json({
        status: false,
        message: error.message
      })
  }
}
