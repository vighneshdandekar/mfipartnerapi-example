let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../../config/credentials.json')[STAGE];
const DvaraGold = require('../../../cliient/dvaragold');
const details = [
    {

        orderId: '55f48350-df7b-11e9-a276-61ef2c20eaa7',
        paymentDate: 'dasd',
        txnReference: '1234',
        paymentInstrumentType: 'cash',

    },    {

        orderId: 'f146a0e0-df7b-11e9-b140-edb285b0f59e',
        paymentDate: 'dasd',
        txnReference: '1234',
        paymentInstrumentType: 'cash',

    }
]

async function test(){
    let client = await DvaraGold.Client(config);
    return await client.addPaymentDetails(details);
}
test()
.then(result=>{
    console.dir(result)
})
.catch(err=>{
    console.error(err)
})
.finally(()=>{
    process.exit(0);
})