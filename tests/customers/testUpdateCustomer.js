const authenticatiion = require('../../auth/authenticate.js');

const async = require('async');

var testUpdateCustomer = function () {
    async.waterfall([

        // authetication
        function (callback) {
            authenticatiion.authenticateClient(function (err, client) {
                callback(err, client)
            })
        },

        // GET one record
        function (client, callback) {
            var extCustomerId = "VGNEW11234-000";
            client
                .invokeApi(null, `/customers/${extCustomerId}`, 'GET')
                .then(function (result) {
                    if (result.data) {
                        callback(null, client, result.data);
                    } else {
                        callback('NO records')
                    }

                })
                .catch(function (error) {
                    let err = {
                        status: error.response.status,
                        statusText: error.response.statusText,
                        data: error.response.data
                    }
                    callback(err, null, null);
                })

        },

        // UPDATE one record
        function (client, getData, callback) {
            var updateData = {
                bankAccount: {
                    accountNumber: '1123145462',
                    ifsc: "ICIC0210024",
                    accountName: "Aneel",
                    bankName: "ICIC",
                    branchName: "Nellore"
                },
                branchId:"27"
            }
            getData.bankAccount = updateData.bankAccount;
            client
                .invokeApi(null, `/customers/${getData.extCustomerId}`, 'PUT', {}, getData)
                .then(function (result) {
                    if (result.data) {
                        callback(null, result.data);
                    } else {
                        callback('NO records')
                    }

                })
                .catch(function (error) {
                    let err = {
                        status: error.response.status,
                        statusText: error.response.statusText,
                        data: error.response.data
                    }
                    callback(err, null);
                })
        }
    ], function (err, result) {
        if (err) {
            console.log('err:', err)

        } else {
            console.log('', result);
        }
    });
}

testUpdateCustomer();