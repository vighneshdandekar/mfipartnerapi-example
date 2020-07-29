let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../../config/credentials.json')[STAGE];
const DvaraGold = require('../../../cliient/dvaragold');
const payment = {
    orderIds: [
        '8bd6a810-a61b-11ea-ab2a-6ba08ec49f4b',
        'fdb3daf0-a618-11ea-b280-81044c0a5686'
    ],
    paymentDate: '2020-07-07',
    txnReference: '1234',
    paymentInstrumentType: 'UPI',
    txnDetails: {},
    paymentTotalValueInr: 2,
}
async function test() {
    let client = await DvaraGold.Client(config);
    return await client.addPaymentDetailsForETforders(payment)
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