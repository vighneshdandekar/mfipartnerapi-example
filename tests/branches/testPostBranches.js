let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../config/credentials.json')[STAGE];
const DvaraGold = require('../../cliient/dvaragold');
const shortid = require('shortid')

var saveBranches = async function (client, callback) {
    let _branches = []
    client = await DvaraGold.Client(config);
    var _id = shortid.generate();
    for (let i = 1; i <= 400; i++) {
        _branches.push(
            {
                "quarterlyVaultChargesInINR": 0,
                "extBranchId": `${_id}_${i}`,
                "branchType": "district",
                "name": "AAA111",
                "gstNumber": "11AAAAA1111A1Z1",
                "phone": "5656565656",
                "totalCustomers": 10,
                "activeCustomers": 2,
                "numberOfAgents": 10,
                "activationDate": "2019-11-04T05:21:11.000Z",
                "remarks": "",
                "communicationAddress": {
                    "nearByPoliceStation": "",
                    "unitNumber": "1",
                    "streetName": "Radio mirchi road, pralhad nagar",
                    "area": "",
                    "cityOrVillage": "Ahemdabad",
                    "postOffice": "",
                    "district": "Ahemdabad",
                    "pinCode": 380015,
                    "state": "IN-RJ",
                    "stdCode": 111,
                    "landmark": "",
                    "country": "India"
                },
                "bankAccount": {
                    "accountNumber": "ICIC0000012",
                    "ifsc": "ICIC0000012",
                    "accountName": "acs",
                    "bankName": "bank name",
                    "branchName": "branch name"
                },
                "branchManager": {
                    "externalId": "",
                    "email": "vighnesh@fg.com",
                    "dob": "1968-04-03T00:00:00.000Z",
                    "gender": "m",
                    "name": {
                        "first": "Nilkathelegence",
                        "middle": "",
                        "last": "test"
                    },
                    "phone": {
                        "landline": "",
                        "alternateMobile": "",
                        "mobile": "1773672887",
                        "whatsapp": "",
                        "boardNumber": "",
                        "extension": ""
                    },
                    "address": {
                        "unitNumber": "wqdwqd",
                        "streetName": "Radio mirchi road, pralhad nagar",
                        "area": "",
                        "cityOrVillage": "Ahemdabad",
                        "postOffice": "",
                        "district": "dwdwd",
                        "pinCode": 402202,
                        "state": "IN-RJ",
                        "stdCode": 11,
                        "landmark": "",
                        "country": "India"
                    }
                },
            }
        )


    }
    return client.saveBranches(_branches)
}

saveBranches()
    .then(result => {
        console.dir(result)
    })
    .catch(err => {
        console.error(err)
    })
    .finally(() => {
        process.exit(0);
    })