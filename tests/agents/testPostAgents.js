
let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../config/credentials.json')[STAGE];
const DvaraGold = require('../../cliient/dvaragold');
const shortid = require('shortid')
const _agents = []
for (let i = 1; i <= 50; i++) {
    const _id = shortid.generate();
    _agents.push(
        {
            "type": "average",
            "extAgentId": `Aman${_id}_${i}`,
            "agentActive": false,
            "extBranchId": "1-address-check",
            "maritalStatus": "single",
            "name": {
                "first": "1-address-check",
                "middle": "",
                "last": "1-address-check"
            },
            "email": "1-address-check@gmial.com",
            "dob": "",
            "gender": "m",
            "phone": {
                "landline": "",
                "alternateMobile": "",
                "mobile": "8288298292",
                "whatsapp": ""
            },
            "remarks": "",
            "address": {
                "houseNumber": "2221",
                "streetName": "stee",
                "area": "area",
                "cityOrVillage": "vity",
                "postOffice": "post offcie",
                "district": "wcsacscs",
                "pinCode": 402202,
                "state": "IN-AN",
                "stdCode": 9811,
                "landmark": "ladmar",
                "country": "India"
            },
            "bankAccount": {
                "accountNumber": "09393883838",
                "ifsc": "ICIC0000001",
                "accountName": "Account holder name",
                "bankName": "bank name",
                "branchName": "branch name"
            },
            "spouseDetails": {
                "name": {
                    "first": "first name",
                    "middle": "middle name",
                    "last": "last name"
                },
                "gender": "m",
                "dob": "2020-12-15T00:00:00.000Z",
                "email": "email@gmail.com",
                "phone": {
                    "landline": "8600363676",
                    "alternateMobile": "8600363676",
                    "mobile": "8600363676",
                    "whatsapp": "8600363676"
                },
                "address": {
                    "houseNumber": "house uniti",
                    "streetName": "stree name",
                    "area": "area",
                    "cityOrVillage": "city",
                    "postOffice": "post office",
                    "district": "district",
                    "pinCode": 402202,
                    "state": "IN-AN",
                    "stdCode": 30,
                    "landmark": "landmark",
                    "country": "India"
                }
            }
        }


    )
}

async function test() {
    let client = await DvaraGold.Client(config);
    return await client.saveAgents(_agents);
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