const authenticatiion = require('../auth/authenticate.js');

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
    id: "065ddc30-b526-11e9-8b04-2d003f7641cd",
    "bullionName": "gold",
    "bullionShortName": "24KGLD",
    "purity": "24kt",
    "status": "available"
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
    const extCustomerId = "EXTCUST01";
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