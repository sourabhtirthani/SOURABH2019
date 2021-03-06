const fetch = require('node-fetch');
const async = require('async');
const db = require('./db');
const Transaction = require('../models/current_transactions');
const token_add = require('../models/token_address');
const normal_add = require('../models/normal_address');


exports.transfunction = async(req, res) => {
    try {

        let new_data = [];
        let trans;
        var created_user;

        let time = Math.floor(Date.now() / 1000)
            // console.log(time);
        let post;
        // Call the API


        fetch(`https://api.etherscan.io/api?module=block&action=getblocknobytime&timestamp=${time}&closest=before&apikey=XGADRVYKMKNVP1Z2RCH3ZFIGB7CZTBM8XW`).then(function(response)

            {
                if (response.ok) {
                    post = response.result
                    console.log("success");
                    setInterval(function() {
                        fetch(`https://api.etherscan.io/api?module=account&action=txlistinternal&startblock=11937146&endblock=${post}&page=1&offset=10&sort=desc&apikey=XGADRVYKMKNVP1Z2RCH3ZFIGB7CZTBM8XW`)
                            .then((responce) => responce.json())
                            .then(async(responce) => {
                                new_data = responce.result;

                                
                                async.each(new_data,
                                    async(element) => {
                                        let temp = { blocknumber: '', from: '', to: '', hash: '', value: '', timeStamp: '' };
                                        temp.blocknumber = element.blockNumber;
                                        temp.from = element.from;
                                        temp.to = element.to;
                                        temp.hash = element.hash;
                                        temp.timeStamp = element.timeStamp;
                                        temp.value = element.value;

                                        trans = new Transaction(temp)
                                        created_user = await trans.save()
                                            //console.log("createduser", created_user);

                                        if (element.contractAddress === '') {

                                            let temp = { blocknumber: '', from: '', to: '', hash: '', contractAddress: '', value: '', timeStamp: '' };
                                            temp.blocknumber = element.blockNumber;
                                            temp.from = element.from;
                                            temp.to = element.to;
                                            temp.hash = element.hash;
                                            temp.timeStamp = element.timeStamp;
                                            temp.value = element.value;
                                            temp.contractAddress = element.contractAddress
                                            let normal = new normal_add(temp)
                                            let normal_data = await normal.save()

                                        } else {

                                            let temp1 = { blocknumber: '', from: '', to: '', hash: '', contractAddress: '', value: '', timeStamp: '' };
                                            temp1.blocknumber = element.blockNumber;
                                            temp1.from = element.from;
                                            temp1.to = element.to;
                                            temp1.hash = element.hash;
                                            temp1.timeStamp = element.timeStamp;
                                            temp1.value = element.value;
                                            temp1.contractAddress = element.contractAddress
                                            let token = new token_add(temp1)
                                            let token_data = await token.save()
                                        }
                                    }
                                )
                            });
                    }, 1000)
                } else {
                    return Promise.reject(response);
                }


            }).then(
            console.log(" successfull")
        ).catch((e) => {
            console.log(e);
        })

    } catch (err) {
        console.log('in ethfunction error');
        console.log(err);
        res.status(500).send({ success: false, msg: 'Error', data: {}, errors: '' });
    }

};

exports.fetch_data = async(req, res) => {
    let token = await token_add.find({});
    let trans = await Transaction.find({});
    let normal = await normal_add.find({});
    //console.log(user);
    res.status(200).send({
        success: true,
        msg: 'Done',
        data: { trans, token, normal },
        errors: ''
    })

}



