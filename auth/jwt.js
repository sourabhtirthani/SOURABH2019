const jwt = require('jsonwebtoken')
require('dotenv').config()
const db = require('../common/db');
const UserLog = require('../models/userlog')
const mongoose = require('mongoose');

exports.generateToken = async function (user) {
    try {
        let token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
        let user_obj = {user_id:user.user_id,token:token};
        let insert_token = new UserLog(user_obj);
        let created_user =  await insert_token.save();
        return token;
    } catch (err) {
        console.log('in generateToken function error');
        console.log(err);
    }
};
exports.authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) return res.status(401).send({ success: false, msg: 'Unauthorized', data: '', errors: ''});
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
            if (err) return res.status(403).send({ success: false, msg: 'Forbidden', data: '', errors: err});
            req.user = user;
            let check_token = await UserLog.find({user_id:mongoose.Types.ObjectId(user.user_id) ,token:token});
            if(check_token.length == 1){
                next()
            }else{
                return res.status(403).send({ success: false, msg: 'Forbidden', data: '', errors: err});
            }
        })
    } catch (err) {
        console.log('in authenticateToken function error');
        console.log(err);
        res.status(500).send({ success: false, msg: 'Error', data: '', errors: err});
    }
};