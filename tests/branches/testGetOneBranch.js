const authenticatiion = require('../../auth/authenticate.js');

var testGetOneBranch = function () {
    authenticatiion.authenticateClient(function (err, client) {
        if (client) {
            function callback(error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(JSON.stringify(body));
                }
            }
            getBranch(client, callback);
        }
        else {
            console.error(err);
        }
    })
}

var getBranch = function (client, callback) {
    var _id ='caNwGhfus1';
    client
        .invokeApi(null, `/branches/${_id}`, 'GET')
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

testGetOneBranch();