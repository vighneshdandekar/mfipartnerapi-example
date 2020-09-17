let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../../config/credentials.json')[STAGE];
const DvaraGold = require('../../../cliient/dvaragold');

//AAA111CST001
//AAA333CST001
//pramitcst001
const extCustomerId = "EXT0";
const sipId = "d3bbaec0-f65f-11ea-8c0e-ab363ee7f32e";
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

const updated_sip = {
    "milestoneName": "Diwali-Update-one",
    "sipName": "MySIP20-update",
    "bullion": bullion,
    "sipInstallmentAmtInr": 5000,
    "startDate": "2020-09-17",
    "frequency": "monthly",
    "paymentPeriodInMths": 5,
    "sipTarget": {
        "targetType": "FixedAmount",
        "targetAmountInr": 100000,
    },
}

async function test() {
    let client = await DvaraGold.Client(config)
    return await client.updateCustomerSip(extCustomerId, sipId, updated_sip)
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