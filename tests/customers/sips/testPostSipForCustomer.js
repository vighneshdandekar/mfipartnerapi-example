let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../../config/credentials.json')[STAGE];
const DvaraGold = require('../../../cliient/dvaragold');

const extCustomerId = "EXT0";
const bullion = {
    "id": "G3",
    "bullionShortName": "G22K",
    "bullionName": "Gold",
    "purity": {
        "displayValue": "22Kt (91.6)",
        "value": "916"
    },
    "status": "available"
}


const sip = {
    "milestoneName": "Diwali-Update",
    "sipName": "MySIP20-update",
    "bullion": bullion,
    "sipInstallmentAmtInr": 5000,
    "startDate": "2020-09-07",
    "frequency": "monthly",
    "sipTarget": {
        "targetType": "FixedAmount",
        "targetAmountInr": 100000,
    },
    preferredSipDay: 1,
    numberofInstallments: 3,
    "firstSipInstallmentDate": "2020-09-07",
}
async function test() {
    let client = await DvaraGold.Client(config)
    return await client.createCustomerSip(extCustomerId, sip)
}

test()
    .then(result => {
        console.dir(result)
    })
    .catch(err => {
        console.error(err)
    })
    .finally(() => {
        process.exit(0);
    })