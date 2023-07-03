import Users from '../models/Users.js';
import jwt from 'jsonwebtoken';

export const auth = async (req,res,next) => {
    try {
       const token = req.headers.authorization.split(' ')[1];
       if(!token) return res.status(404).json({status:false,message:'token required'});
       const decodeToken = jwt.verify(token,process.env.JWT_SECRET_KEY);
       const user = await Users.findById({_id:decodeToken.user});
       if(!user) return res.status(404).json({status:false,message:"no user found"});
       req.userId = user.userId
       next()
    } catch (error) {
      res.status(500).json({status:false,message:error.message});
    }
}

export const auth2 = async (req,res,next) => {
    try {
        const userId = req.params.userId;
        const user =  await Users.findById(userId);
        if(!user) return res.status(404).json({status:false,message:"no user found"}); 
        const token = req.headers.authorization.split(' ')[1];
       if(!token) return res.status(404).json({status:false,message:'token required'});
       const decodeToken = jwt.verify(token,process.env.JWT_SECRET_KEY);
       if(userId!==decodeToken.user) return res.status(404).json({status:false,message:"you are not authorized to update this profile"});
       next();
} catch (error) {
        res.status(500).json({status:false,message:error.message}); 
    }
}
