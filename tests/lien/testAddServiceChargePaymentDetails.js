let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../config/credentials.json')[STAGE];
const DvaraGold = require('../../cliient/dvaragold');

async function test() {
    let client = await DvaraGold.Client(config);
    const data = {
      
        "paymentTotalValueInr": 0,
        "payBy": "bullionbalance",
        "paymentDate": "2020-10-14T09:44:47.286Z",
        "txnReference": "string",
        "txnDetails": {
          "neft_reference": "OC45rt456"
        },
        "paymentInstrumentType": "NEFT"
      
    
    }
    
    var leinId='b91a2ce0-120c-11eb-b5af-3b11a8c636ec'   
    return await client.addServiceChargePaymentDetail(leinId,data)
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