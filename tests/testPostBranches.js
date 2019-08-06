const authenticatiion = require('../auth/authenticate.js');
const shortid = require('shortid')

var testPostBranches = function () {
    authenticatiion.authenticateClient(function (err, client) {
        if (client) {
            function callback(error, response, body) {
                if (!error && response.statusCode == 200) {
                    var info = JSON.parse(body);
                    console.log(info);

                }
            }
            saveBranches(client, callback);
        }
        else {
            console.error(err);
        }
    })
}

var saveBranches = function (client, callback) {
    var _id = shortid.generate();
    const _branches = [
        {extBranchId: `${_id}1`, name:`Branch - (${_id}1`  },
        {extBranchId: `${_id}2`, name:`Branch - (${_id}2`  },
        {extBranchId: `${_id}3`, name:`Branch - (${_id}3`  }
    ]
    client
        .invokeApi(null, '/branches', 'POST', {}, _branches)
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

testPostBranches();