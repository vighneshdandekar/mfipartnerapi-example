let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../../config/credentials.json')[STAGE];
const DvaraGold = require('../../../cliient/dvaragold');

//AAA111CST001
//AAA333CST001
const extCustomerId = "ext-vighnesh";
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

async function test() {
    let client = await DvaraGold.Client(config)
    let rates = await client.bookBullionRate(extCustomerId, bullion.bullionName, bullion.id, 'buy')
    const aBookedRate = rates[0];
    const _order = {
        agent: { extAgentId: 'EXTAGT007', name: { first: "Koshi", middle: "Venkateshwara", last: "Shaikh" } }, //An Agent that is not known to MyGold.
        bullion: bullion, //need a valid bullion id
        bullionRateId: aBookedRate.id, //bullion rateid got through rate booking.
        weightInGm: 1,
        rateInrPerGm: 2751,
        orderTotalValueInr: 1000,  //can be 0 to skip an installment.      
        jewelerId: '1234',  // TODO: Need a valid Jeweller loopup                     
        taxRates: aBookedRate.taxRates
    }
    return await client.createJewelerOrder(extCustomerId, _order)
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