const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username required"],
        unique: [true, "username exists"],

    },
    email: {
        type: String,
        required: [true, "email required"],
        unique: [true, "email exists"],
    },
     password: {
        type: String,
        required: [true, "password required"],
        select:[false]
        
    }
});

const userModel=mongoose.model('users',userSchema)

module.exports=userModel;

