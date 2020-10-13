let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../../config/credentials.json')[STAGE];
const DvaraGold = require('../../../cliient/dvaragold');
const extCustomerId = "ffa9da6a8375dca831fb3be97291763c";
const orderId = '2c7c25d0-0d3a-11eb-9929-c50a305f8431'

async function test() {
    let client = await DvaraGold.Client(config);
    return await client.jewelleryGet(extCustomerId, orderId)
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