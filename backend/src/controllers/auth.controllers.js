const userModel=require('../models/user.model')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt');
let registerController=async(req,res)=>{
try{
    const {username,email,password}=req.body;
    const pass=await bcrypt.hash(password,10)
    const isUserExist=await userModel.findOne({username,email})
    if(isUserExist) return res.status(401).json("user already exists");
    const user=await userModel.create({username,email,password:pass});
    console.log(user);
    
    const token=jwt.sign({username:user.username,email:user.email,id:user._id},process.env.JWT_SECRET,{expiresIn:"1D"})
    res.cookie("token",token);
       return res.status(201).json({ 'account created': { user: user.username, mail: user.email, id: user._id, token } });

}
catch(err){
    console.log(err);
}
}

let loginController=async(req,res)=>{
try{
     const { username, email, password } = req.body;

    const user = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    }).select("+password")
    if (!user) {
        return res.status(409).json({
            message: 'user doesnt exists'
        })
    }
    const isPassMatch = await bcrypt.compare(password, user.password)
    if (!isPassMatch) {
        return res.status(409).json({
            message: "invalid pass"
        })
    }
    const token = jwt.sign({ id: user._id,username }, process.env.JWT_SECRET, { expiresIn: '1d' })

    res.cookie('token', token)
    res.status(201).json({
        message: 'user successfully logged in', user: {
            username: user.username,
            bio: user.bio,
            pfp: user.pfp
        }
    })
}
catch(err){
    console.log(err);
    
}
}

let getMe=async(req,res)=>{
    const {username}=req.user;
    const userDetails=await userModel.findOne({username});
    return res.status(200).json(userDetails);
}

module.exports={registerController,loginController,getMe}