let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../../config/credentials.json')[STAGE];
const DvaraGold = require('../../../cliient/dvaragold');
const details = {
    orderIds: [],
    paymentDate: new Date(),
    txnReference: '1234',
    paymentInstrumentType: 'NEFT',
    paymentTotalValueInr: 130
}
for (let i = 1; i <= 100; i++) {
    details.orderIds.push("f9a8d3b0-3557-11eb-b571-f15e4b551f9f")
}


async function test() {
    console.log(`no of orders ${details.orderIds.length}`)
    let client = await DvaraGold.Client(config);
    return await client.addPaymentDetails(details);
}
test()
    .then(result => {
        console.dir(result)
    })
    .catch(err => {
        console.error(err.data)
    })
    .finally(() => {
        process.exit(0);
    })