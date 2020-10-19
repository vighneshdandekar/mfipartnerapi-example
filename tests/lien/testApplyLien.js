let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../config/credentials.json')[STAGE];
const DvaraGold = require('../../cliient/dvaragold');
const data = {
    "customerId": "EXT0",
    "jewellerySerialNumbers": [
    "1010",
    ],
   "lienAgreementDocuments": [
'd4f261c8-93e1-4ade-93db-18b67c8e6007'
],
  "lienCompanyName": "HDFC",
  "lienCompanyRegistrationNumber": "12345",
  "tenureInDays": 100,
  "loanAmountInr": 100000,
  // "lienServiceChargePaymentDetails": {
  //   "paymentTotalValueInr": 0,
  //   "payBy": "bullionbalance",
  //   "paymentDate": "2020-10-14T09:44:47.286Z",
  //   "txnReference": "string",
  //   "txnDetails": {
  //     "neft_reference": "OC45rt456"
  //   },
  //   "paymentInstrumentType": "NEFT"
  // }

}

async function test() {
    let client = await DvaraGold.Client(config);
    return await client.applyLein(data)
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