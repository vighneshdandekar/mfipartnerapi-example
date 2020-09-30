let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../../config/credentials.json')[STAGE];
const DvaraGold = require('../../../cliient/dvaragold');
const customerId = 'EXT0';
const sipId = `155d75b0-0322-11eb-a7bc-59ad9a155dd7`;

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
    "milestoneName": "Diwali-newLast1",
    "sipName": "MySIP20newLast1",
    "bullion": bullion,
    "sipInstallmentAmtInr": 12000,
    "startDate": "2020-10-19",
    "frequency": "monthly",
    "sipTarget": {
        "targetType": "FixedAmount",
        "targetAmountInr": 12000,
    },
    preferredSipDay: 2,
    numberofInstallments: 5,
    "firstSipInstallmentDate": "2020-10-29",
}




async function test() {
    let client = await DvaraGold.Client(config);

    return await client.updateCustomerflexiSip(customerId, sipId, sip);
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