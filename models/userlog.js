const mongoose = require('mongoose'); 
const validator = require('validator');
const User = require('./user');

const userLogSchema = new mongoose.Schema({
    user_id:  {
        type:mongoose.Schema.Types.Mixed,
        ref:User,
    }
    ,
    token:{
        type:String
    },
    sys_info:{
        type:String,
    },
    time:{
        type:Date,
        default:  Date.now()
    },
    last_used_time:{
        type:Date,
        default: new Date()
    }

});

const UserLog = new mongoose.model('user_log',userLogSchema);
module.exports = UserLog;