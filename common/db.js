require('dotenv').config();
const mongoose = require('mongoose');
const user    = process.env.db_user;
const password= process.env.db_pass;
const port     =  27017;
const url = `mongodb://${process.env.db_host}:${port}/${process.env.db_name}`;

mongoose.connect(url,{
    useNewUrlParser: true, 
    useUnifiedTopology: true , 
    useCreateIndex:true ,
    useFindAndModify:false})
    .then(()=>{
        console.log("Connection Successfull......");
    }).catch((err)=>{
        console.log(err);
    });