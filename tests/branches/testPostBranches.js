let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../config/credentials.json')[STAGE];
const DvaraGold = require('../cliient/dvaragold');
const shortid = require('shortid')

var saveBranches = async function (client, callback) {
    let client = await DvaraGold.Client(config);
    var _id = shortid.generate();
    const _branches = [
        {
            extBranchId:'EXTB123412123',
            branchType:'district',
            name:'District Branch 12345',
            communicationAddress: {
                unitNumber: "01", streetName: "Thennali", district: "Madurai", pinCode: 695678, state: "TN", stdCode: 20, country: "IN"
            },
            gstNumber:"ABDCR123456",
            phone:"4701234567",
            branchManager:{
                "extId": "BM12456",
                "name": {
                  "first": "SRATH",
                  "middle": "SHAIL",
                  "last": "SHUKH"
                },
                "dob": "2019-08-26",
                "gender": "m",
                "email": "user@example.com",
                "phone": {
                  "mobile": "9988776655",
                  "landline": "9988776655"
                },
                "address": {
                    unitNumber: "01", streetName: "Thennali", district: "Madurai", pinCode: 695678, state: "TN", stdCode: 20, country: "IN"
                }
            },
            bankAccount:{
                "accountNumber": 1234567890,
                "ifsc": "ABV123455",
                "accountName": "Test Acoount",
                "bankName": "ICICI Bank",
                "branchName": "Madurai"
              }
        }
]
    return client.saveBranches(_branches)
}

saveBranches()
.then(result=>{
    console.dir(result)
})
.catch(err=>{
    console.error(err)
})
.finally(()=>{
    process.exit(0);
})