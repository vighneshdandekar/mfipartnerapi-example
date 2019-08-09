const authenticatiion = require('../../auth/authenticate.js');

var testGetBranches = function () {
    authenticatiion.authenticateClient(function (err, client) {
        if (client) {
            function callback(error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(JSON.stringify(body));
                }
            }
            getBranches(client, callback);
        }
        else {
            console.error(err);
        }
    })
}

var getBranches = function (client, callback) {
    client
        .invokeApi(null, '/branches', 'GET')
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

testGetBranches();