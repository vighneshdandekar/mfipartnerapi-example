let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../../config/credentials.json')[STAGE];
const DvaraGold = require('../../../cliient/dvaragold');
const extCustomerId = "ffa9da6a8375dca831fb3be97291763c";
const orderId = '166c13c0-f7e3-11ea-a8b3-89944d5b668e'

async function test() {
    let client = await DvaraGold.Client(config);
    return await client.emergencySellGet(extCustomerId, orderId)
}
test()
    .then(result => {
        console.dir(result)
    })
    .catch(err => {
        console.error(JSON.stringify(err))
    })
    .finally(() => {
        process.exit(0);
    })