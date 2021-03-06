const mongoose = require('mongoose'); 
const validator = require('validator');
const User = require('./user');

const emailSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.Mixed ,
        ref:User,
    },
    to:{
        type:String,
        default:'',
    },
    sub:{
        type:String,
        default:''
    },
    msg:{
        type:String,
        default:''
    },
    insert_time: {
         type:Date,
         default: new Date()
    },
    update_time:{
        type:Date,
        default:Date.now()
    }
});
const Email = new mongoose.model('email',emailSchema);
module.exports = Email;

