const shortid = require('shortid')
let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../config/credentials.json')[STAGE];
const DvaraGold = require('../../cliient/dvaragold');

async function test() {
    let client = await DvaraGold.Client(config);

    var _id = shortid.generate();
    const _customers = []
    for (var i = 0; i < 1; i++) {
        var _id = shortid.generate();
        _customers.push(
            {
                name: {
                    first: `John ${_id}`,
                    middle: 'Trivia',
                    last: 'Somtune'
                },
                extCustomerId: `0001_verify_account${i}`,
                dob: "1957-09-05",
                phone: { mobile: `860036367${i}` },
                idProof: [{
                    documentId: `ABC1234XV${i}`,
                    documentType: 'maskedAadhaar',
                    documentImage: {
                        id: '1234',
                        uri: '/customers/uploaded/ce65ad07-a0b1-452b-ba19-7cea4f149360'
                    },
                    issueDate: new Date(),
                    validUntil: new Date()
                }],
                address: {
                    houseNumber: "1", streetName: "2", district: "Tvm", pinCode: 402202, state: "IN-KL", country: "India", stdCode: 0470
                },
                fatherName: {
                    first: "Groverty ",
                    last: `${_id}`
                },
                centerName: "Center",
                maritalStatus: "married",
                localLanguage: "Tamil",
                branchId: 'EXT002311',
                gender: 'm',
                "bankAccount": {
                    "accountNumber": "",
                    "ifsc": "",
                    "accountName": "",
                    "bankName": "",
                    "branchName": ""
                },
                upiAccount: { address: "" }
            }
        )
    }

    return await client.saveCustomers(_customers);
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