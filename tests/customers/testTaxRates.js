let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../config/credentials.json')[STAGE];
const DvaraGold = require('../../cliient/dvaragold');
const extCustomerId = "aa7fd74fdaa07f5457937bb1d3d6a536";
const queryParams = {
    bullionId: 'G3',
    rateType: 'buy'
}

async function test() {
    let client = await DvaraGold.Client(config);
    return await client.taxRates(extCustomerId, queryParams)
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