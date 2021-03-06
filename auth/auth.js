"use strict";
require('dotenv').config();
const db = require('../common/db');
const validation = require('./validation');
const User = require('../models/user');
const Otp = require('../models/otp');
const sha256 = require('sha256');
const jwt = require('./jwt');
const otp_fun = require('../common/otp');
const UserLog = require('../models/userlog');
const mongoose = require('mongoose');


// Email verify After Sign up   
exports.email_verify = async (req, res) => {
    try {
        let username = req.body.username;
        let otp = req.body.otp;
        let user = await User.find({username:username});
        if(user.length){
            let email = user[0].email;
            let data = {email: email, otp: otp};
            let otp_result = await otp_fun.otp_verify(data);
            if(otp_result['success']){
                let user = await User.updateOne({"username":username},{$set:{"status":1}});
                if(user.ok == 1){
                    res.status(200).send({ success: true, msg:'Your email has been verifyed successfully.', data: {}, errors: ''});
                }else{
                    res.status(200).send({ success: false, msg: 'Error', data: {}, errors: ''});
                }
            }else{
                res.status(200).send(otp_result);
            }
        }else{
            res.status(200).send({ success: false, msg: 'No user found', data: {}, errors: ''});
        }
                
    } catch (err) {
        console.log('in email_verify function error');
        console.log(err);
        res.status(500).send({ success: false, msg: 'Error', data: {}, errors: err});
    }
};
// Email verify After Sign up   

// Login
exports.login = async (req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;
        let user = await User.find({email:email});
        if(user.length)
        {
            let hash = user[0].password;
            if(sha256(password) == hash )
            {
                const user_obj = { user_id: user[0]._id, email: email }
                const accessToken = await jwt.generateToken(user_obj);
                res.status(200).json({ success: true, msg: 'Successfully logged In!', data: user_obj, accessToken: accessToken, errors: ''});   
            }
            else{
                    res.status(200).send({ success: false, msg: 'username and password not found', data: {}, errors: ''});
                }
        
        }else{
            res.status(200).send({ success: false, msg: 'username and password match not found', data: {}, errors: ''});
        }
    } catch (err) {
        console.log('in login function error');
        console.log(err);
        res.status(500).send({ success: false, msg: 'Error', data: {}, errors: err});
    }
};
//Login


//Sign up 
exports.signup = async (req, res) =>
{    
    try 
    {
        let data = validation.signupFieldsValid(req.body);
        if(data['success'])
        {
              data = data['data'];
        }
        else
        {
           return res.status(200).send(data);
        }
        let username = data.username;
        let email = data.email;
        let password = data.password;
        let re_password = data.re_password;
        let otp = req.body.otp;
            if(password == re_password)
            {
                let username_check = await User.find({username:username});
                if(!username_check.length)
                {
                    let email_check =await User.find({email:email})
                    if(!email_check.length)
                    {
                        let status = 0;
                        if(otp != '' && otp != null){
                            let data = {email: email, otp: otp};
                            let otp_result = await otp_fun.otp_verify(data);
                            if(otp_result['success']){
                               status = 1;
                            }else{
                                res.status(200).send(otp_result);
                                return;
                            }
                        }else{
                            let data = {email: email};
                            let otp_result = await otp_fun.otp_gen(data);
                            if(otp_result['success']){
                                
                            }else{
                                res.status(200).send(otp_result);
                                return;
                            }
                        }
                        if(status){data = {username:username,email:email,password:password,status:status};}
                        let hash = sha256(password);
                        data.password = hash;
                        let user = new User(data);
                        let created_user =  await user.save();
                        if (created_user._id) {
                            return  res.status(200).send({ success: true, msg: "Successfully registered", data: {}, errors: "", registered: true });
                        } else {
                            return res.status(200).send({ success: false, msg: "Error in registering User", data: {}, errors: "" });
                        }
                    }
                    else {
                        return res.status(200).send({ success: false, msg: "Email is Already Registered", data: {}, errors: "" });
                        
                    }
                }
                else
                {
                    return res.status(200).send({ success: false, msg: 'Username Already Taken!', data: {}, errors: ''});
                }

            }
            else 
            {
                return res.status(200).send({ success: false, msg: 'Password Mismatch!', data: {}, errors: '' });
            }     
    } 
    catch (err) {
        console.log('in signup function error');
        console.log(err);
        return res.status(500).send({ success: false, msg: 'Error', data: {}, errors: err });
    }
};
//Sign up


// Email OTP To send otp and verifying during signup
exports.email_otp = async (req, res) => {
    try {
        let email = req.body.email;
        if(email != '' && email != null){
            let email_check = await User.find({email:email});
            if(!email_check.length){
                let data = {email: email};
                let otp_result = await otp_fun.otp_gen(data);
                res.status(200).send(otp_result);
            }else{
                res.status(200).send({ success: false, msg: 'Email is already registered', data: {}, errors: ''});
            }
        }else{
            res.status(200).send({ success: false, msg: 'Please enter a valid email', data: {}, errors: ''});
        }
    } catch (err) {
        console.log('in email_otp function error');
        console.log(err);
        res.status(500).send({ success: false, msg: 'Error', data: {}, errors: err});
    }
};
// Email OTP to Send otp and then register

exports.logout = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        let user_id = req.user.user_id;
        let delete_token = await UserLog.deleteOne({user_id:mongoose.Types.ObjectId(user_id),token:token});
        if(delete_token.deletedCount){
            res.status(200).send({ success: true, msg: 'Logout!', data: {}, errors: ''});
        }else{
            res.status(200).send({ success: false, msg: 'Error in Logout', data: {}, errors: ''});
        }
    } catch (err) {
        console.log('in logout function error');
        console.log(err);
        res.status(500).send({ success: false, msg: 'Error', data: {}, errors: err});
    }
};

exports.logout_all = async (req, res) => {
    try {
        let user_id = req.user.user_id;
        let delete_token = await UserLog.deleteMany({user_id:mongoose.Types.ObjectId(user_id)});
        if(delete_token.ok){
            let msg = 'Logout from '+delete_token.deletedCount+' devices';
            res.status(200).send({ success: true, msg: msg, data: {}, errors: ''});
        }else{
            res.status(200).send({ success: false, msg: 'Error in Logout', data: {}, errors: ''});
        }
    } catch (err) {
        console.log('in logout all function error');
        console.log(err);
        res.status(500).send({ success: false, msg: 'Error', data: {}, errors: err});
    }
};

exports.forget_password_get_otp = async (req, res) => {
    try {
        let username = req.body.username;
        let email = req.body.email;
        let user = await User.find({username:username,email:email});
        if(user.length){
            let tx_id = 'FP'+user[0].id+""+Math.floor(Date.now() / 1000);
            let data = {user_id: user[0]._id, email: email, tx_id: tx_id, msg: 'Forget Password'};
            let otp_result = await otp_fun.otp_gen(data);
            if(otp_result['success']){
                res.status(200).send({ success: true, msg:'An OTP sent to your email.', data: {tx_id: tx_id}, errors: ''});
            }else{
                res.status(200).send(otp_result);
            }
        }else{
            res.status(200).send({ success: false, msg: 'No match found', data: {}, errors: ''});
        }
    } catch (err) {
        console.log('in forget_password_get_otp function error');
        console.log(err);
        res.status(500).send({ success: false, msg: 'Error', data: {}, errors: err});
    }
};

exports.forget_password_verify_otp = async (req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;
        let re_password = req.body.re_password;
        let otp = req.body.otp;
        if(password == re_password){
                let password_hash = sha256(password);
                let user = await  User.find({email:email})
                let otp_details = await Otp.find({otp:otp,user_id:user[0]._id});
                let tx_id = otp_details[0].tx_id;
                if(user.length){
                    let email = user[0].email;
                    let data = {email: email, otp: otp, tx_id: tx_id, user_id: user[0].id};
                    let otp_result = await otp_fun.otp_verify(data);
                    if(otp_result['success'])
                    {     
                        let user = await User.updateOne({"email":email},{$set:{"password":password_hash}});          
                        if(user.nModified == 1){
                            res.status(200).send({ success: true, msg: 'Password successfully changed.', data: {}, errors: ''});
                        }else{
                            res.status(200).send({ success: false, msg: 'Error', data: {}, errors: ''});
                        }
                    }
                    else{
                        res.status(200).send(otp_result);
                    }
                }
                else{
                    res.status(200).send({ success: false, msg: 'No user found', data: {}, errors: ''});
                }
        }
        else{
            res.status(200).send({success:false,msg:'Password not match'});
        }
    } catch (err) {
        console.log('in forget_password_verify_otp function error');
        console.log(err);
        res.status(500).send({ success: false, msg: 'Error', data: {}, errors: err});
    }
};