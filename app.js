"use strict";
require('./common/db');
const express = require('express');
const bodyParser  = require("body-parser");
const auth  = require('./auth/auth');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();
const jwt = require('./auth/jwt');
const common = require('./common/eth');

app.use(helmet());
app.use(cors());
app.use(morgan('combined'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

console.log("RUNING NEW NODE ON AWS...",Date.now());
app.get('/',(req,res)=>{
    res.status(200).send({success: true, msg: 'Welcome to the ETH.'});
});



//Authentication API's
app.post('/signup',[auth.signup]);
app.post('/login',[auth.login]);
app.post('/email_otp',[auth.email_otp]);
app.post('/email_verify',[auth.email_verify]);
app.post('/forget_password_get_otp',[auth.forget_password_get_otp]);
app.post('/forget_password_verify_otp',[auth.forget_password_verify_otp]);
//Authentication API's

app.use(jwt.authenticateToken);
app.post('/logout', [auth.logout]);
app.post('/logout_all', [auth.logout_all]);

app.get('/transfunction', [common.transfunction]);
app.get('/fetch_data', [common.fetch_data]);


app.listen(3000);