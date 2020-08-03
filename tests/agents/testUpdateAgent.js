

let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../config/credentials.json')[STAGE];
const DvaraGold = require('../../cliient/dvaragold');
const extBranchId = '000AB';
const extAgentId = 'PxhHRpG_-3';
const updateData = {
    extBranchId: extBranchId,
    extAgentId: extAgentId,
    name: { first: "Ajay", middle: "", last: "Singh" },
    phone: { mobile: "9100280078" }, email: 'aneel@trader.jo',
    address: {
        houseNumber: "1", streetName: "2", district: "Tvm", pinCode: 402202, state: "IN-KL", country: "India", stdCode: 0470
    },
};



async function test() {
    let client = await DvaraGold.Client(config);

    let getData = await client.getAgent(extAgentId);

    getData.name = updateData.name
    getData.address = updateData.address
    getData.phone = updateData.phone

    return await client.updateAgent(extAgentId, updateData);
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