const authenticatiion = require('../../auth/authenticate.js');
const shortid = require('shortid')

var testPostAgents = function () {
    authenticatiion.authenticateClient(function (err, client) {
        if (client) {
            function callback(error, response, body) {
                if (!error && response.statusCode == 200) {
                    var info = JSON.parse(body);
                    console.log(info);

                }
            }
            saveAgents(client, callback);
        }
        else {
            console.error(err);
        }
    })
}

var saveAgents = function (client, callback) {
    var _id = shortid.generate();
    const _agents = [
        {
            extAgentId: `${_id}1`, extBranchId: 'EXT002311', name: { first: "Ajay", middle: "", last: "Singh" },
            phone: { mobile: "7276589783" }, email: 'joe@trader.jo',
            address: {
                houseNumber: "1", streetName: "2", district: "Tvm", pinCode: 402202, state: "IN-KL", country: "India", stdCode: 0470
            },
            spouseDetails: {
                name: { first: "Ajay", middle: "", last: "Singh" },
                address: {
                    houseNumber: "1", streetName: "2", district: "Tvm", pinCode: 402202, state: "IN-KL", country: "India", stdCode: 0470
                },
            }
        },
        {
            extAgentId: `${_id}2`, extBranchId: 'EXT002311', name: { first: "ajit", middle: "", last: "Singh" },
            phone: { mobile: "7276589783" }, email: 'joe@trader.jo',
            address: {
                houseNumber: "1", streetName: "2", district: "Tvm", pinCode: 402202, state: "IN-KL", country: "India", stdCode: 0470
            },
        },
        {
            extAgentId: `${_id}3`, extBranchId: 'EXT002311', name: { first: "Ajay", middle: "", last: "kumar" },
            phone: { mobile: "7276589783" }, email: 'joe@trader.jo',
            spouseDetails: {
                name: { first: "Ajay", middle: "", last: "Singh" },
                address: {
                    houseNumber: "1", streetName: "2", district: "Tvm", pinCode: 402202, state: "IN-KL", country: "India", stdCode: 0470
                },
            },
        }
    ]
    client
        .invokeApi(null, '/agents', 'POST', {}, _agents)
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

testPostAgents();