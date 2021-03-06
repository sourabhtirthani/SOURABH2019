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
    contractAddress: {
        type: String,

    },
    value: {
        type: Number,
        default: 0,
    },

timestamp : { type: Number, default: (new Date()).getTime() }
});
const normal_add = new mongoose.model('normal_address', trans_Schema);
module.exports = normal_add