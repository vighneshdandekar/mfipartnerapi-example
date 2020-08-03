let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../../config/credentials.json')[STAGE];
const DvaraGold = require('../../../cliient/dvaragold');

const requestData = {
    
        "responsibility": "partner",
        "refType": "aadhaar",
        "refId": "string",
        "idProof": {
          "documentId": "2ea03750-e00a-47f8-9e48-1e9940c1d9f7",
          "documentImage": {
            "id": "string",
            "uri": "string"
          },
          "documentType": "passport",
          "issueDate": "2020-07-30",
          "validUntil": "2020-07-30"
        },
        "addressProof": {
          "documentId": "2ea03750-e00a-47f8-9e48-1e9940c1d9f7",
          "documentImage": {
            "uri": "string",
             "id":'sa'
          },
          "documentType": "passport",
          "issueDate": "2020-07-30",
          "validUntil": "2020-07-30"
        }
      
}
var loanId='a91cd280-d24b-11ea-a37d-3bd3c7057d46';
async function test() {
    let client = await DvaraGold.Client(config);
    return await client.addKycDetails(requestData,loanId)
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