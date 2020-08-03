let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../config/credentials.json')[STAGE];
const DvaraGold = require('../../cliient/dvaragold');
var extBranchId = 'EXT002311';

async function test() {
    let client = await DvaraGold.Client(config);

    let getData = await client.getBranch(extBranchId);


    getData.name = "Zonal Branch 002311";
    getData.gstNumber = "11AAAAA1111A1Z1";
    getData.branchType = "zonal";
    getData.communicationAddress.pinCode = 625020
    getData.branchManager.address.pinCode = 625011



    return await client.updateBranch(extBranchId, getData);
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






