const authenticatiion = require('../../../auth/authenticate.js');

var testSetupNewSip = function () {
    authenticatiion.authenticateClient(function (err, client) {
        if (client) {
            function callback(error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(JSON.stringify(body));
                }
            }
            setupSip(client, callback);
        }
        else {
            console.error(err);
        }
    })
}

const bullion = {
    id : "85133eb0-cf13-11e9-93fb-afb974e4a37c",
    bullionShortName : "GD24K - 999",
    bullionName : "Gold",
    purity : {
        displayValue : "24Kt - (99.9%)",
        value : "999"
    },
    status : "available"
}

const sip = {
    "sipName": "Save4Me",
    "bullion": bullion,
    "sipInstallmentAmtInr": 1000,
    "targetQuantityInGm": 10,
    "startDate": "2019-08-09",
    "paymentPeriodInMths": 12,
    "frequency": "fortnightly"
}

var setupSip = function (client, callback) {
    const extCustomerId = "BG1234567-000";
    const sipData = {}
    client
        .invokeApi(null, `/customers/${extCustomerId}/sips`,
            'POST', {},
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

testSetupNewSip();