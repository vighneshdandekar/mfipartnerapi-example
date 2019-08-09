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
            var extAgentId = 'hJ47Wd-oX1';
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
                phone: { landline: "", alternateMobile: "", mobile: "2332132234", whatsapp: "2332132234", boardNumber: "", extension: "" }
            }
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