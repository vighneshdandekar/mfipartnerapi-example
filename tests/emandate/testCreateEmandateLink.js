let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../config/credentials.json')[STAGE];
const DvaraGold = require('../../cliient/dvaragold');

async function test(){
    let client = await DvaraGold.Client(config);
    var obj={
        sipId:'2c925443-0326-11eb-8daa-85d3ea2ad559',
        sendLinkToCustomer:true,
        paymentInstrumentType:'debitCard'
    }
    var extCustomerId='EXT0'
    return await client.createEmandateLink(obj,extCustomerId);
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