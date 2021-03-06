const mongoose = require('mongoose');
const validator = require('validator');

const trans_Schema = new mongoose.Schema({
    blocknumber: {
        type: Number,
    },
    from: {
        type: String,

    },
    to: {
        type: String,

    },
    hash: {
        type: String,

    },
    value: {
        type: Number,
        default: 0,
    },
timestamp : { type: Number, default: (new Date()).getTime() } 


});
const Transaction = new mongoose.model('transaction', trans_Schema);
module.exports = Transaction