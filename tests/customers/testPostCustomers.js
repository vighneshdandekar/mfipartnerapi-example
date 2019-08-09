const authenticatiion = require('../../auth/authenticate.js');
const shortid = require('shortid')

var testPostCustomers = function () {
    authenticatiion.authenticateClient(function (err, client) {
        if (client) {
            function callback(error, response, body) {
                if (!error && response.statusCode == 200) {
                    var info = JSON.parse(body);
                    console.log(info);

                }
            }
            saveCustomers(client, callback);
        }
        else {
            console.error(err);
        }
    })
}

var saveCustomers = function (client, callback) {
    var _id = shortid.generate();
    const _customers = [
        {
            extCustomerId: `${_id}1`,
            partnerId: "f9a8fcc0-aea1-11e9-96bd-3ba433522f42",
            branchId: "4f754550-baa0-11e9-8572-55b7befcb811",
            agentId: "ee454990-baa1-11e9-add4-4904f0ea4a91",
            name: { first: "Ajay", middle: "", last: "Singh" }
        },
        {
            extCustomerId: `${_id}2`,
            partnerId: "f9a8fcc0-aea1-11e9-96bd-3ba433522f42",
            branchId: "4f754550-baa0-11e9-8572-55b7befcb811",
            agentId: "ee454990-baa1-11e9-add4-4904f0ea4a91",
            name: { first: "Ajit", middle: "", last: "Singh" }
        },
        {
            extCustomerId: `${_id}3`,
            partnerId: "f9a8fcc0-aea1-11e9-96bd-3ba433522f42",
            branchId: "4f754550-baa0-11e9-8572-55b7befcb811",
            agentId: "ee454990-baa1-11e9-add4-4904f0ea4a91",
            name: { first: "Ajay", middle: "", last: "Kumar" }
        }
    ]
    client
        .invokeApi(null, '/customers', 'POST', {}, _customers)
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

testPostCustomers();