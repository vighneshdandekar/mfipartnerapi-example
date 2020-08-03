let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../config/credentials.json')[STAGE];
const DvaraGold = require('../../cliient/dvaragold');
var extBranchId = '000AB';

async function test() {
    let client = await DvaraGold.Client(config);

    let getData = await client.getBranch(extBranchId);

    getData.name = "Aneel branch in madhurai"
    return await client.updateBranch(extBranchId, getData);
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