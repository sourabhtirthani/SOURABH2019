const mongoose = require('mongoose'); 
const validator = require('validator');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minLength:4
    },
    email:{
        type:String,
        required:true,
        unique:[true,"Email id is already Present"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email")
            }
        }
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    status:{
        type:Number,
        default:0
    },
    created_at: {
         type:Date,
         default: new Date()
    },
    updated_at:{
        type:Date,
        default:Date.now()
    }
});
const User = new mongoose.model('user',userSchema);
module.exports = User;


