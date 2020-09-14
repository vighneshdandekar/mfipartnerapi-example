let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../../config/credentials.json')[STAGE];
const DvaraGold = require('../../../cliient/dvaragold');
const customerId = 'EXT0';
const sipId = `497ce680-f645-11ea-82d4-cd425d501a08`;

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
    "sipInstallmentAmtInr": 1000,
    "startDate": "2020-09-19",
    "frequency": "monthly",
    "sipTarget": {
        "targetType": "FixedAmount",
        "targetAmountInr": 12000,
    },
    preferredSipDay: 2,
    numberofInstallments: 5,
    "firstSipInstallmentDate": "2020-09-29",
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