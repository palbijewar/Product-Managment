import Users from '../models/Users.js';
import {uploadFile} from '../aws/aws.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const register = async (req,res) => {
 try {
    const {fname,lname,email,phone,password,address,billing} = req.body;
    const files = req.files;
    if(files && files.length>0){
        let uploadedFileURL= await uploadFile( files[0] )
        req.body.profileImage = uploadedFileURL
    }
    else{
        res.status(400).send({ msg: "No file found" })
    }
 const hashPass = await bcrypt.hash(password,10);
 const data = {...req.body,password:hashPass};
 const response = await Users.create(data);
 res.status(201).json({status:true,data:response});
 } catch (error) {
    res.status(500).json({status:false,message:error.message})
 }
}

export const login = async (req,res) => {
    try { 
    const {email,password} = req.body;
    const user = await Users.findOne({email});
    console.log(user)
    if(!user) return res.status(404).json({status:false,message:"no user found"});
    const hashPass = bcrypt.compare(password,user.password);
    console.log(hashPass)
    if(hashPass===false) return res.status(404).json({status:false,message:"incorrect password"});
    const token = jwt.sign({user:user._id.toString()}, process.env.JWT_SECRET_KEY,{
        expiresIn:"3d"
    });
    res.status(200).json({status:true,data:user._id,token})
    } catch (error) {
    res.status(500).json({status:false,message:error.message})   
    }
}

export const users = async (req,res) => {
    try {
    const userId = req.params.userId;
    const user = await Users.findById(userId);
    if(!user) return res.status(404).json({status:false,message:"no user found"});
    res.status(200).json({status:true,data:user})
    } catch (error) {
    res.status(500).json({status:false,message:error.message})    
    }
}

export const updateProfile = async (req,res) => {
    try {
    const userId = req.params.userId;
    const user = await Users.findById(userId);
    if(!user) return res.status(404).json({status:false,message:"no user found"});
    const data = req.body;
    const files = req.files;
    if(files && files.length>0){
        let uploadedFileURL= await uploadFile( files[0] )
        req.body.profileImage = uploadedFileURL
    }
    const updation = await Users.findByIdAndUpdate(
        userId,
        req.body,
        {new:true}
    );
    res.status(200).json({status:true,data:updation}); 
    } catch (error) {
    res.status(500).json({status:false,message:error.message})      
    }
}