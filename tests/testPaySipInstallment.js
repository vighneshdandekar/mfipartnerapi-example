const authenticatiion = require('../auth/authenticate.js');

var testPaySipInstallment = function () {
    authenticatiion.authenticateClient(function (err, client) {
        if (client) {
            function callback(error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(JSON.stringify(body));
                }
            }
            sendPaySipInsyallment(client, callback);
        }
        else {
            console.error(err);
        }
    })
}

const sipOrder = {
    agentId:'EXTAGT02',
    bullion:{id:"97389e60-9f24-11e9-af59-6586eb183cd1"}, //need a valid bullion id
    bullionRateId:'63f61be3d62ec6fbe2209dd9cf2217db08db84075fc4fc524a9fc0077dc1fa32', //bullion rateid got through rate booking.
    sipId:"95a3b92b-be8a-11e9-9c52-e958d197b95c", //id of a setup customer is part of.
    weightInGm:1,
    rateInrPerGm:2751,
    orderTotalValueInr:0,  //can be 0 to skip an installment.                           
    taxRates:[
        {
            taxName: "sgst",
            taxCode:"sgst",
            taxRatePercent: 18
        }        
    ]
}

var sendPaySipInsyallment = function (client, callback) {
    const extCustomerId = "EXTCUST01";
    client
        .invokeApi(null, `/customers/${extCustomerId}/siporders`,
            'POST', {},
            sipOrder
        )
        .then(function (result) {
            console.dir(result.data)
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

testPaySipInstallment();