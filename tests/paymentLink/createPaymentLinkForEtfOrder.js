let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../config/credentials.json')[STAGE];
const DvaraGold = require('../../cliient/dvaragold');

async function test() {
    let client = await DvaraGold.Client(config);
    var obj = {
        orderId: 'a845fa80-031f-11eb-9875-21912f051100',
        sendLinkToCustomer: false
    }
    return await client.createPaymentLinkEtf(obj);
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