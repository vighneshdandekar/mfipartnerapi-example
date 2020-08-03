let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../../config/credentials.json')[STAGE];
const DvaraGold = require('../../../cliient/dvaragold');
const loanId = '2dfbc050-d2f7-11ea-b54a-d3ab131e21bf'
const data = {
    uploadId: "2d42d12b-de42-4256-8067-98c53d1e1067"
}

async function test() {
    let client = await DvaraGold.Client(config);
    return await client.addconsentdetails(loanId, data)
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