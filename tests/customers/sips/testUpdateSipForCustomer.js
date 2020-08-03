let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../../config/credentials.json')[STAGE];
const DvaraGold = require('../../../cliient/dvaragold');
const customerId = 'EXT0';
const sipId = `154a28b1-d56b-11ea-b5a8-67e5675e49c8`;

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
    "milestoneName": "Diwali-Update",
    "sipName": "MySIP20-update",
    "bullion": bullion,
    "sipInstallmentAmtInr": 5000,
    "startDate": "2020-08-03",
    "paymentPeriodInMths": 36,
    "frequency": "monthly",
    "sipTarget": {
        "targetType": "FixedAmount",
        "targetAmountInr": 100000,
    }
}




async function test() {
    let client = await DvaraGold.Client(config);

    return await client.updateCustomerSip(customerId, sipId, sip);
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