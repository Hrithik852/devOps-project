const express=require('express');
const cookieParser=require('cookie-parser')
const Authrouter = require('./routes/auth.routes');

const app=express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(Authrouter);

module.exports=app;
