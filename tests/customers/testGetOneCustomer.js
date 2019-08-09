const authenticatiion = require('../../auth/authenticate.js');

var testGetOneCustomer = function () {
    authenticatiion.authenticateClient(function (err, client) {
        if (client) {
            function callback(error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(JSON.stringify(body));
                }
            }
            getCustomer(client, callback);
        }
        else {
            console.error(err);
        }
    })
}

var getCustomer = function (client, callback) {
    var _id ='tOEKWuaVk1';
    client
        .invokeApi(null, '/customers/' + _id, 'GET')
        .then(function (result) {
            console.log(result.data)
        })
        .catch(function (result) {
            if (result.response) {
                console.dir({
                    status: result.response.status,
                    statusText: result.response.statusText,
                    data: result.response.data
                });
            } else {
                console.log(result.message);
            }
        });
}

testGetOneCustomer();