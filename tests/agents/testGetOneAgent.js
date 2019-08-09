const authenticatiion = require('../../auth/authenticate.js');

var testGetOneAgent = function () {
    authenticatiion.authenticateClient(function (err, client) {
        if (client) {
            function callback(error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(JSON.stringify(body));
                }
            }
            getAgent(client, callback);
        }
        else {
            console.error(err);
        }
    })
}

var getAgent = function (client, callback) {
    var _id ='hJ47Wd-oX1';
    client
        .invokeApi(null, '/agents/' + _id, 'GET')
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

testGetOneAgent();