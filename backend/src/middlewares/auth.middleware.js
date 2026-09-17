const userModel=require('../models/user.model')
const jwt=require('jsonwebtoken')
let identifyUser=async(req,res,next)=>{
    const token=req.cookies.token;
    if(!token){
        return res.status(401).json("unauthorized no token found")
    }
    let decoded=null

    try{
         decoded=jwt.verify(token,process.env.JWT_SECRET)
    }
    catch(err){
        console.log(err);
        return res.status(404).json(err);
        
    }
    console.log(decoded);
    
    req.user=decoded;
    next();
}

module.exports={identifyUser}