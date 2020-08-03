const STAGE = 'admin';
const config = require('../../config/credentials.json')[STAGE];
const DvaraGold = require('../../cliient/dvaragold');
const orderid = 'b04eaa70-ec13-11e9-bfb9-571f571fcbcd';

async function test() {
    let client = await DvaraGold.Client(config);
    return await client.getInvoice(orderid);
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