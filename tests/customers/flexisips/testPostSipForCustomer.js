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
    "milestoneName": "Diwali-newLast1",
    "sipName": "MySIP20newLast1",
    "bullion": bullion,
    "sipInstallmentAmtInr": 1000,
    "startDate": "2020-09-15",
    "frequency": "monthly",
    "sipTarget": {
        "targetType": "FixedAmount",
        "targetAmountInr": 12000,
    },
    preferredSipDay: 2,
    numberofInstallments: 5,
    "firstSipInstallmentDate": "2020-09-16",
}
async function test() {
    let client = await DvaraGold.Client(config)
    return await client.createCustomerflexiSip(extCustomerId, sip)
}

test()
    .then(result => {
        if (result.sipInstallments) {
            console.table(result.sipInstallments)
        }
        console.dir(result)
    })
    .catch(err => {
        console.error(err)
    })
    .finally(() => {
        process.exit(0);
    })