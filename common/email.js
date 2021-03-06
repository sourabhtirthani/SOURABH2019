require('dotenv').config()
const nodemailer = require('nodemailer'); 
const toCsv = require('to-csv');
const request = require("request");
const db = require('./db');
const Email = require('../models/email');
function send_mails(to_mail,subj,htmlBody){
    
    let transporter = nodemailer.createTransport({
        host: "smtpout.asia.secureserver.net",
        port: 80,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.mail_user, // generated ethereal user
          pass: process.env.mail_pass // generated ethereal password
        },
        tls:{
          rejectUnauthorized:false
        }
    });

    var mailOptions = {
        from: process.env.mail_from,
        to: to_mail,
        subject: subj,
        html: htmlBody
    };
    
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                var options = { method: 'POST',
                    url: 'http://cryptodopez.com/test_mail.php',
                    formData: 
                    { to: to_mail,
                    sub: subj,
                    body: htmlBody } };
                
                request(options, function (error, response, body) {
                    if (error){
                        let email_insert = new Email({
                            to:to_mail.toString(),
                            sub:subj.toString(),
                            msg:htmlBody.toString(),
                            status:'Not Send'
                        })
                        email_insert.save();
                        reject(error);
                    }else{
                        let email_insert = new Email({
                            to:to_mail.toString(),
                            sub:subj.toString(),
                            msg:htmlBody.toString(),
                            status:'Sent By Php'
                        })
                         email_insert.save();
                    }
                    resolve(body);
                });
            } else {
                let email_insert = new Email({
                    to:to_mail.toString(),
                    sub:subj.toString(),
                    msg:htmlBody.toString(),
                    status:'Sent'
                })
                email_insert.save();
                resolve(info);
            }
        });
    })
    
}

exports.signup_otp = async (name,otp,email) => {
    let htmlContent = "<p>Dear "+name+",</p><p>Heartiest congratulations for registering with "+process.env.company_name+" group. You are just one step away from availing  a lifetime financial opportunity.</p><p>Just verify below OTP and avail your lifetime financial window.</p><h1>"+otp+"</h1><br><p>Regards,<br>"+process.env.company_name+" Team<br>"+process.env.mail_from+"</p>";
    return await send_mails(email,"Verify Your Email",htmlContent);
};


exports.otp_gen = async (email,otp,name,msg,tx_id) => {
    if(email != '' && otp != ''){
        let htmlContent = "<p>Dear "+name+",</p><p>This email is sent you for the perpose to verify that this is you who doing action on our system.</p>";
        if(msg != '') htmlContent = htmlContent + "<p>" + msg + "</p>";
        if(tx_id != '') htmlContent = htmlContent + "<h3> Transaction ID : " + tx_id + "</h3>";
        htmlContent = htmlContent + "<br><p>Please contect us if not you or verify below OTP.</p><h1>"+otp+"</h1><br><p>Regards,<br>"+process.env.company_name+" Team<br>"+process.env.mail_from+"</p>";
        return await send_mails(email,"One Time Password",htmlContent);
    }else{
        return false;
    }
};

exports.otp_verifyed = async (email,name,msg,tx_id) => {
    if(email != ''){
        let htmlContent = "<p>Dear "+name+",</p><p>This email is sent you for the perpose to notify you that an OTP is verifyed.</p>";
        if(msg != '') htmlContent = htmlContent + "<p>" + msg + "</p>";
        if(tx_id != '') htmlContent = htmlContent + "<h3> Transaction ID : " + tx_id + "</h3>";
        htmlContent = htmlContent + "<br><p>Please contect us if not you.</p><br><p>Regards,<br>"+process.env.company_name+" Team<br>"+process.env.mail_from+"</p>";
        return await send_mails(email,"One Time Password Verifyed",htmlContent);
    }else{
        return false;
    }
};