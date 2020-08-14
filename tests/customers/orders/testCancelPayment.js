let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../../config/credentials.json')[STAGE];
const DvaraGold = require('../../../cliient/dvaragold');

//pramitcst001
const extCustomerId = 'ext-vighnesh';
const orderId = 'f9865db0-de1a-11ea-af5b-937fe89fc96e';
const total='5022.37'
async function test() {
    let client = await DvaraGold.Client(config)
    return await client.cancelPayment(extCustomerId, orderId, total,"a duplicate order.  requests cancellation")
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