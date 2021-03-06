const mongoose = require('mongoose'); 
const validator = require('validator');
const User = require('./user');

const otpSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.Mixed,
        ref:User
    },
    email:{
        type:String,
        default:''
    },
    tx_id:{
        type:String,
        default:''
    },
    type:{
        type:String,
        default:''
    },
    coin:{
        type:String,
        default: ''
    },
    amount:{
        type:String,
        default:''
    },
    to:{
        type:String,
        default:''
    },
    otp:{
        type:Number,
        default:null
    },
    otp_status:{
        type:Number,
        default:0
    },
    msg:{
        type:String,
        default:null
    },
    insert_time: {
         type:Date,
         default: new Date()
    },
   
});
const Otp = new mongoose.model('otp',otpSchema);
module.exports = Otp;
