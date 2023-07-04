import Users from '../models/Users.js';
import {uploadFile} from '../aws/aws.js';
import {isValid,validString,validateEmail,isValidReqBody,isValidPassword,isValidPhoneNumber} from '../utils/utils.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const register = async (req,res) => {
 try {
    const {fname,lname,email,phone,password,address} = req.body;
    const {shipping,billing} = address;
    const files = req.files;
    if(files && files.length>0){
        let uploadedFileURL= await uploadFile( files[0] )
        req.body.profileImage = uploadedFileURL
    }
    else{
        res.status(400).send({ msg: "No file found" })
    }
    if(address === null){
      
        return  res.status(400).send({status : false, msg : "address required" })
       }
    if(billing === null){
  
        return  res.status(400).send({status : false, msg : "billing required" })
       }
      if(!shipping.street){
        return  res.status(400).send({status : false, msg : "street required" })
      }
      if(!shipping.city){
        return  res.status(400).send({status : false, msg : "city required" })
      }
      if(!shipping.pincode){
        return  res.status(400).send({status : false, msg : "pincode required" })
      }

      if(!billing.street){
        return  res.status(400).send({status : false, msg : "street required" })
      }
      if(!billing.city){
        return  res.status(400).send({status : false, msg : "city required" })
      }
      if(!billing.pincode){
        return  res.status(400).send({status : false, msg : "pincode required" })
     }
    //validations
if(!isValidReqBody(req.body)) return res.status(404).json({status:false,message:"enter data empty field"})   
if(!validString(fname && lname)) return res.status(404).json({status:false,message:"enter correct name format"}) 
if(!validateEmail(email)) return res.status(404).json({status:false,message:"enter correct email format"}) 
if(!isValidPassword(password)) return res.status(404).json({status:false,message:"enter correct password format"}) 
if(!isValidPhoneNumber(phone)) return res.status(404).json({status:false,message:"enter correct phone format"})
 const hashPass = await bcrypt.hash(password,10);
 const data = {...req.body,password:hashPass};
 const response = await Users.create(data);
 res.status(201).json({status:true,message:"success",data:response});
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
    res.status(200).json({status:true,message:"success",data:user})
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
    res.status(200).json({status:true,message:"success",data:updation}); 
    } catch (error) {
    res.status(500).json({status:false,message:error.message})      
    }
}