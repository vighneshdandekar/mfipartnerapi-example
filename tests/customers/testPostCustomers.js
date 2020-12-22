const shortid = require('shortid')
let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../config/credentials.json')[STAGE];
const DvaraGold = require('../../cliient/dvaragold');

async function test() {
    let client = await DvaraGold.Client(config);

    var _id = shortid.generate();
    const _customers = []
    for (var i = 0; i < 60; i++) {
        var _id = shortid.generate();
        _customers.push(
            {
                "extCustomerId": `${_id}`,
                "kycReference": [
                    {
                        "refType": "aadhaar",
                        "refId": "adhar based kyc"
                    },
                    {
                        "refType": "ckyc",
                        "refId": "cental kyc"
                    },
                    {
                        "refType": "partnerkyc",
                        "refId": "partner kyc"
                    }
                ],
                "branchId": "AAA111",
                "agentId": "AAA111AGNT002",
                "dob": "2019-10-02T00:00:00.000Z",
                "gender": "m",
                "maritalStatus": "single",
                "centerName": "adasdfas",
                "localName": "asdfadf",
                "localLanguage": "en",
                "email": `${_id}@adssa.com`,
                "name": {
                    "first": "Amit",
                    "middle": "Test",
                    "last": "S"
                },
                "phone": {
                    "landline": "9461044004",
                    "alternateMobile": "9461044004",
                    "mobile": "9900990094",
                    "whatsapp": "9461044004"
                },
                "address": {
                    "houseNumber": "sfsd",
                    "streetName": "sdsd",
                    "area": "area",
                    "cityOrVillage": "cityOrVillage",
                    "postOffice": "postOffice",
                    "district": "sdfds",
                    "pinCode": 411027,
                    "state": "IN-AN",
                    "stdCode": 0,
                    "landmark": "landmark",
                    "country": "India"
                },
                "spouseName": {
                    "first": "spouse name",
                    "middle": "middle name l",
                    "last": "last name"
                },
                "fatherName": {
                    "first": "father name",
                    "middle": "middle name ",
                    "last": "last name"
                },
                "idProof": [
                    {
                        "documentType": "passport",
                        "documentId": "8",
                        "documentImage": {
                            "id": "",
                            "uri": ""
                        },
                        "issueDate": "2019-10-09T12:03:47.000Z",
                        "validUntil": "2019-10-30T12:03:47.000Z"
                    },
                    {
                        "documentType": "pan",
                        "documentId": "8",
                        "documentImage": {
                            "id": "2b21f476-72c2-4427-83a0-8e47448b1529",
                            "uri": "/customers/uploaded/2b21f476-72c2-4427-83a0-8e47448b1529"
                        },
                        "issueDate": "2019-10-09T12:03:47.000Z",
                        "validUntil": "2019-10-30T12:03:47.000Z"
                    }
                ],
                "bankAccount": {
                    "accountNumber": "adfsafsafAFSAF",
                    "ifsc": "AAAA0111111",
                    "accountName": "SFafFf",
                    "bankName": "ASDFSAadswd",
                    "branchName": "ASFf"
                },
                "nominee": {
                    "gender": "m",
                    "relation": "Other",
                    "email": "nominee@gmail.com",
                    "name": {
                        "first": "nominee name",
                        "middle": "middle name",
                        "last": "last namr"
                    },
                    "phone": {
                        "landline": "8379990099",
                        "alternateMobile": "8379990099",
                        "mobile": "8379990099",
                        "whatsapp": "8379990099"
                    },
                    "address": {
                        "houseNumber": "cvczv",
                        "streetName": "zcvfdsf",
                        "area": "ars",
                        "cityOrVillage": "city",
                        "postOffice": "postoffice",
                        "district": "czvzv",
                        "pinCode": 411027,
                        "state": "IN-AN",
                        "stdCode": 404,
                        "landmark": "landmark",
                        "country": "India"
                    }
                },
                "userActive": false,
                "username": "username",
                "consentDocUri": "/customers/uploaded/consent/39fd588b-bde0-451d-8bce-a956f679ae61",
                "isNewCustomer": true,
                "remarks": "safsaf",
                "isBankAccountVerified": true,
                "upiAccount": {
                    "address": "dafda@okicici"
                },
                "isUpiAccountVerified": true,
                "familyMembers": [
                    {
                        "gender": "m",
                        "relation": "Child",
                        "email": "ancb@gmail.com",
                        "name": {
                            "first": "family memeber",
                            "middle": "middle name",
                            "last": "last name"
                        },
                        "phone": {
                            "landline": "9383737889",
                            "alternateMobile": "9383737889",
                            "mobile": "9383737889",
                            "whatsapp": "9383737889"
                        },
                        "address": {
                            "houseNumber": "jo833",
                            "streetName": "stree name",
                            "area": "area",
                            "cityOrVillage": "city",
                            "postOffice": "post office ",
                            "district": "district",
                            "pinCode": 402202,
                            "state": "IN-AN",
                            "stdCode": 23,
                            "landmark": "landmark",
                            "country": "India"
                        }
                    }
                ],
                "giftContacts": [
                    {
                        "gender": "m",
                        "relation": "Other",
                        "email": "anc@gmail.com",
                        "name": {
                            "first": "gift contatcs",
                            "middle": "middle namr",
                            "last": "last name"
                        },
                        "phone": {
                            "landline": "8273399737",
                            "alternateMobile": "8273399737",
                            "mobile": "8273399737",
                            "whatsapp": "8273399737"
                        },
                        "address": {
                            "houseNumber": "house nam",
                            "streetName": "stree name",
                            "area": "area",
                            "cityOrVillage": "city",
                            "postOffice": "post office",
                            "district": "district",
                            "pinCode": 402202,
                            "state": "IN-AN",
                            "stdCode": 3938,
                            "landmark": "landmark",
                            "country": "India"
                        }
                    }
                ]
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