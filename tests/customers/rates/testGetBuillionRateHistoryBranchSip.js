let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../../config/credentials.json')[STAGE];
const DvaraGold = require('../../../cliient/dvaragold');

var testGetRate = async function () {
    const extBranchId = "DV12BR";
    let client = await DvaraGold.Client(config);
    return client.bullionRateHistoryBranchSip(extBranchId,'G3')
}

testGetRate()
    .then(result => {
        console.dir(result)
    })
    .catch(err => {
        console.error(err)
    })
    .finally(() => {
        process.exit(0);
    })