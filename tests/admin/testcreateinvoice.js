let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../config/credentials.json')[STAGE];
const DvaraGold = require('../../cliient/dvaragold');
const orderid = 'ac9499b0-9f3e-11ea-a5c6-2dfc7482fb83';
const extCustomerId = "b309204509e42514bd328e764f97d4a1";

async function test() {
    let client = await DvaraGold.Client(config);
    return await client.getInvoice(extCustomerId, orderid);
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