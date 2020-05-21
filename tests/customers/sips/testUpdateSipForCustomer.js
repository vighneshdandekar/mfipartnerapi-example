const authenticatiion = require('../../../auth/authenticate.js');

var testUpdateSip = function () {
    authenticatiion.authenticateClient(function (err, client) {
        if (client) {
            function callback(error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(JSON.stringify(body));
                }
            }
            updateSip(client, callback);
        }
        else {
            console.error(err);
        }
    })
}

const bullion = {
    id: "G3",
    bullionShortName: "GD24K - 999",
    bullionName: "Gold",
    purity: {
        displayValue: "24Kt - (99.9%)",
        value: "999"
    },
    status: "available"
}

const sip = {
    "milestoneName": "Diwali",
    "sipName": "Aneel",
    "bullion": bullion,
    "sipInstallmentAmtInr": 4540,
    "targetQuantityInGm": 12,
    "startDate": new Date(),
    "paymentPeriodInMths": 12,
    "frequency": "monthly",
}

var updateSip = function (client, callback) {
    const customerId = 'TestCst001';
    const sipId = 'bc642720-95de-11ea-a3eb-69515d3fa50f';
    const sipData = {}
    client
        .invokeApi(null, `/customers/${customerId}/sips/${sipId}`,
            'PUT', {},
            sip
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

testUpdateSip();