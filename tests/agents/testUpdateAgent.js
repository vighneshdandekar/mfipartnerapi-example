const authenticatiion = require('../../auth/authenticate.js');
const async = require('async');

var testUpdateAgent = function () {
    async.waterfall([
        // authetication
        function (callback) {
            authenticatiion.authenticateClient(function (err, client) {
                callback(err, client)
            })
        },

        // GET one record
        function (client, callback) {
            var extAgentId = 'jCBWe8Xyl1';
            client
                .invokeApi(null, `/agents/${extAgentId}`, 'GET')
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
                extAgentId: `${getData.extAgentId}`, extBranchId: 'EXT002311', name: { first: "Ajay", middle: "", last: "Singh" },
                phone: { mobile: "9100280078" }, email: 'aneel@trader.jo'
            };
            client
                .invokeApi(null, `/agents/${getData.extAgentId}`, 'PUT', {}, updateData)
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

testUpdateAgent();