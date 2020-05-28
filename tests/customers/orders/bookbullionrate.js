let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../../config/credentials.json')[STAGE];
const DvaraGold = require('../../../cliient/dvaragold');
const extCustomerId = "ext-vighnesh";
const bullion = {
    "id": "G3",
    "bullionShortName": "G24K",
    "bullionName": "Gold",
    "purity": {
        "displayValue": "24Kt (99.9%)",
        "value": "999"
    },
    "status": "available"
}

async function test() {
    let client = await DvaraGold.Client(config)
    let rates = await client.bookBullionRate(extCustomerId, bullion.bullionName, bullion.id, 'sipBuy')
    const aBookedRate = rates[0];
    return aBookedRate;
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
