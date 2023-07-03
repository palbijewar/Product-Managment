import express from 'express';
import {register,login,users,updateProfile} from '../controllers/usersController.js';
import {auth,auth2} from '../milddlewares/auth.js';
import AWS from 'aws-sdk';
const router = express.Router();

AWS.config.update({
    accessKeyId: "AKIAY3L35MCRZNIRGT6N",
    secretAccessKey: "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",
    region: "ap-south-1"
})

router.post('/register', register);
router.post('/login', login);
router.get('/user/:userId/profile',auth,users);
router.put('/user/:userId/profile',auth,auth2,updateProfile);




export default router;