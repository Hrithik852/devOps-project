const cors=require('cors');
const express=require('express');
const cookieParser=require('cookie-parser')
const Authrouter = require('./routes/auth.routes');

const app=express();
app.use(cors({
    origin:"http//localhost:5123",
    credentials:true
}))
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth',Authrouter);


module.exports=app;
