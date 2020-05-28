let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../../config/credentials.json')[STAGE];
const DvaraGold = require('../../../cliient/dvaragold');

//pramitcst001
const extCustomerId = 'ext-vighnesh';
const orderId = '238167f0-a0cb-11ea-8075-b1e07f7af05a';

async function test() {
    let client = await DvaraGold.Client(config)
    return await client.cancelOrder(extCustomerId, orderId, "a duplicate order.  requests cancellation")
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