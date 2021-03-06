const db = require('./db');
const send_email = require('./email');
const User = require('../models/user');
const Otp = require('../models/otp');
const mongoose = require('mongoose');

exports.otp_gen = async (data) => {
    try {
        if(data != "" && data != null){
            let user_id = '';
            let email = '';
            let tx_id = '';
            let msg = '';
            let name = '';
            let type = '';
            let coin = '';
            let amount = '';
            let toaddress = '';
            if(data['user_id'] != '' && data['user_id'] != null) user_id = data['user_id'];
            if(data['email'] != '' && data['email'] != null) email = data['email'];
            if(data['tx_id'] != '' && data['tx_id'] != null) tx_id = data['tx_id'];
            if(data['msg'] != '' && data['msg'] != null) msg = data['msg'];
            if(data['type'] != '' && data['type'] != null) type = data['type'];
            if(data['coin'] != '' && data['coin'] != null) coin = data['coin'];
            if(data['amount'] != '' && data['amount'] != null) amount = data['amount'];
            if(data['toaddress'] != '' && data['toaddress'] != null) toaddress = data['toaddress'];
            if(user_id != '' || email != ''){
                let otp = Math.floor(Math.random() * 8999) + 1000;
                if(user_id != ''){
                    let user = await User.find({_id:user_id});
                    if(user.length){
                        if(email == '') email = user[0].email;
                        name = user[0].name;
                    }
                }else{
                    name = email;
                    user_id = 0;
                }
                let deleteotp = await Otp.deleteOne({user_id:user_id,email:email});
                let insert_otp = new Otp({
                    user_id:user_id,
                    email:email,
                    tx_id:tx_id,
                    otp:otp,
                    otp_status:0,
                    msg:msg,
                    type:type,
                    coin:coin,
                    amount:amount,
                    to:toaddress
                });
                await insert_otp.save();
                if(insert_otp){
                    if(await send_email.otp_gen(email,otp,name,msg,tx_id)){
                        return { success: true, msg: 'An OTP sent to you email successfully.', data: data, errors: ''};
                    }else{
                        return { success: false, msg: 'A problem occured while sending mail.', data: data, errors: ''};
                    }
                }else{
                    return { success: false, msg: 'A problem occured while sending mail error 1.', data: data, errors: ''};
                }
            }else{
                console.log("No user_id or email_id in data object.");
                return false;
            }
        }else{
            console.log("No data recived.");
            return false;
        }
    } catch (err) {
        console.log('in email_otp_gen function error');
        console.log(err);
        return { success: false, msg: 'Error', data: '', errors: err};
    }
};

exports.otp_verify = async (data) => {
    try {
        if(data != "" && data != null){
            let user_id = '';
            let email = '';
            let tx_id = '';
            let msg = '';
            let name = '';
            let otp = '';
            otp = data['otp'];
            if(otp == '' || otp == null){
                console.log("No OTP in data object.");
                return false;
            }
            if(data['user_id'] != '' && data['user_id'] != null) user_id = data['user_id'];
            if(data['email'] != '' && data['email'] != null) email = data['email'];
            if(data['tx_id'] != '' && data['tx_id'] != null) tx_id = data['tx_id'];
            if(data['msg'] != '' && data['msg'] != null) msg = data['msg'];
            let get_otp;
            if(user_id != '' || email != ''){
                if(user_id != ''){
                    let user = await User.find({_id: mongoose.Types.ObjectId(user_id)});
                    if(user.length){
                        if(email == '') email = user[0].email;
                        name = user[0].name;
                        get_otp = await Otp.find({user_id:mongoose.Types.ObjectId(user_id),email:email,tx_id:tx_id});
                    }
                }else{
                    name = email;
                    user_id = 0;
                    get_otp = await Otp.find({user_id:user_id,email:email,tx_id:tx_id});
                }
                if(get_otp.length){
                    if(get_otp[0].otp_status < 3){
                        if(get_otp[0].otp == otp){
                            if(await send_email.otp_verifyed(email,name,msg,tx_id)){
                                if(user_id == 0){
                                    let deleteotp = await Otp.deleteOne({user_id:user_id,email:email,tx_id:tx_id});
                                }else{
                                    let deleteotp = await Otp.deleteOne({user_id:mongoose.Types.ObjectId(user_id),email:email,tx_id:tx_id});
                                }
                                    return { success: true, msg: 'OTP verifyed and verification email sent successfully.', data: get_otp[0], errors: ''};
                            }else{
                                return { success: false, msg: 'A problem occured while sending mail.', data: data, errors: ''};
                            }
                        }else{
                            let otp_update = await  Otp.updateOne({ "user_id" : user_id,"email" : email, "tx_id" : tx_id },{$set : { "otp_status" : otp_status + 1},});
                            return { success: false, msg: 'Wrong OTP.', data: data, errors: ''};
                        }
                    }else{
                         let deleteotp = await Otp.deleteOne({user_id:user_id,email:email,tx_id:tx_id});
                        return { success: false, msg: 'Too many attempts.', data: data, errors: ''};
                    }
                }else{
                    return { success: false, msg: 'No OTP record found.', data: data, errors: ''};
                }
            }else{
                console.log("No user_id or email_id in data object.");
                return false;
            }
        }else{
            console.log("No data recived.");
            return false;
        }
    } catch (err) {
        console.log('in email_otp_verify function error');
        console.log(err);
        return { success: false, msg: 'Error', data: '', errors: err};
    }
};