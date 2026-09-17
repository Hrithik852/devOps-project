const express=require('express')
const authController=require('../controllers/auth.controllers');
const { identifyUser } = require('../middlewares/auth.middleware');
const Authrouter=express.Router()
Authrouter.post('/login',authController.loginController);
Authrouter.post('/register',authController.registerController);
Authrouter.get('/get-me',identifyUser,authController.getMe);

module.exports=Authrouter;