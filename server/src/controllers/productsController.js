import Products from '../models/Products.js';
import {uploadFile} from '../aws/aws.js';

 export const products = async (req,res) => {
    try {
      const {title,description,price,currencyId,currencyFormat,isFreeShipping,style,availableSizes,installments} = req.body;
      if(!title || !description || !price || !currencyId || !currencyFormat || !isFreeShipping || !availableSizes) return res.status(400).json({status:false,message:"please provide all the required details"});
      const files = req.files;
      if(files && files.length>0){
        let uploadedFileURL= await uploadFile( files[0] )
        req.body.productImage = uploadedFileURL
     }
      else{
        res.status(400).send({ msg: "No file found" })
     }
    const response = await Products.create(req.body);
    res.status(201).json({status:true,message:"success",data:response});  
    } catch (error) {
      res.status(500).json({status:false,message:error.message});
    }
 }

 export const getProducts = async (req,res) => {
    try {
    const {title,availableSizes,priceGreaterThan,priceLessThan,priceSort} = req.query;
    let filters = {};
    if(title){
    filters.title =  {
        $regex: title,
        $options: "i"
    }
    }
    if(availableSizes){
    filters.availableSizes = {$in:availableSizes}
    }
    if(priceGreaterThan || priceLessThan){
    filters.price = {}
    if(priceGreaterThan){
    filters.price.$gt = Number(priceGreaterThan)
    }
    if(priceLessThan){
    filters.price.$lt = Number(priceLessThan)
    }
    }
    let sort = {};
    if(priceSort){
    sort.price = Number(priceSort)
    }
    const products = await Products.find(filters).sort(sort);
    res.status(200).json({status:true,message:"success",data:products})
    } catch (error) {
    res.status(500).json({status:false,message:error.message});  
    }
 }

export const getProduct = async (req,res) => {
    try {
    const {productId} = req.params;
    const product = await Products.findById(productId);
    if(!product) return res.status(404).json({status:false,message:"no product found"});
    res.status(200).json({status:true,message:"success",data:product});
    } catch (error) {
    res.status(500).json({status:false,message:error.message});  
    }
}

export const updateProduct = async (req,res) => {
    try {
    const {productId} = req.params;
    const {title,description,price,currencyId,currencyFormat,isFreeShipping,style,availableSizes,installments} = req.body;
    const product = await Products.findOneAndUpdate(
    {
      _id:productId, isDeleted:false
    },
       req.body,
      {new:true}
    )
    if(!product) return res.status(404).json({status:false,message:"no product found"});
    res.status(200).json({status:true,message:"success",data:product});
    } catch (error) {
    res.status(500).json({status:false,message:error.message});   
    }
}

export const removeProduct = async (req,res) => {
    try {
    const {productId} = req.params;
    const product = await Products.findOneAndUpdate(
     {_id:productId, isDeleted:false},
     {isDeleted:true, deletedAt: new Date()},
     {new:true}
    );
    if(!product) return res.status(404).json({status:false,message:"no product found"});
    res.status(200).json({status:true,message:"success",data:product}); 
    } catch (error) {
    res.status(500).json({status:false,message:error.message});   
    }
}