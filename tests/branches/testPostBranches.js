const authenticatiion = require('../../auth/authenticate.js');
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
        {
            extBranchId:'EXTB123412123',
            branchType:'district',
            name:'District Branch 12345',
            communicationAddress: {
                unitNumber: "01", streetName: "Thennali", district: "Madurai", pinCode: 695678, state: "TN", stdCode: 20, country: "IN"
            },
            gstNumber:"ABDCR123456",
            phone:"4701234567",
            branchManager:{
                "extId": "BM12456",
                "name": {
                  "first": "SRATH",
                  "middle": "SHAIL",
                  "last": "SHUKH"
                },
                "dob": "2019-08-26",
                "gender": "m",
                "email": "user@example.com",
                "phone": {
                  "mobile": "9988776655",
                  "landline": "9988776655"
                },
                "address": {
                    unitNumber: "01", streetName: "Thennali", district: "Madurai", pinCode: 695678, state: "TN", stdCode: 20, country: "IN"
                }
            },
            bankAccount:{
                "accountNumber": 1234567890,
                "ifsc": "ABV123455",
                "accountName": "Test Acoount",
                "bankName": "ICICI Bank",
                "branchName": "Madurai"
              }
        }
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