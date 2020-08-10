let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../config/credentials.json')[STAGE];
const DvaraGold = require('../../cliient/dvaragold');
const data = [{
    "customerId": "pwamfi001",
    "bankAccount": {
        "accountNumber": "",
        "ifsc": "",
        "accountName": "",
        "bankName": "",
        "branchName": ""
    },
    "upiVpa": "string"
},]

async function test() {
    let client = await DvaraGold.Client(config)
    let customers = await client.verifyBankDetails(data)
    return customers;
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
