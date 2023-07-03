import aws from 'aws-sdk';

export let uploadFile = async ( file) =>{
    return new Promise( function(resolve, reject) {
     let s3= new aws.S3({apiVersion: '2006-03-01'}); 
     var uploadParams= {
         ACL: "public-read",
         Bucket: "classroom-training-bucket",  
         Key: "abc/" + file.originalname, 
         Body: file.buffer
     }
     s3.upload( uploadParams, function (err, data ){
         if(err) {
             return reject({"error": err})
         }
         console.log(data)
         console.log("file uploaded succesfully")
         return resolve(data.Location)
     })
    })
 }