let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../../config/credentials.json')[STAGE];
const DvaraGold = require('../../../cliient/dvaragold');
const extCustomerId ='DV02BR001CST001';
const orederId = 'a15469a0-d0c5-11ea-bced-61af16083350'
async function test() {
    let client = await DvaraGold.Client(config)
    let order = await client.getBuyOrder(extCustomerId, orederId)
    return order;
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
