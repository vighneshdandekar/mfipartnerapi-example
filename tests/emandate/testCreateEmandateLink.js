let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../config/credentials.json')[STAGE];
const DvaraGold = require('../../cliient/dvaragold');

async function test(){
    let client = await DvaraGold.Client(config);
    var obj={
        sipId:'84784150-fbd9-11ea-8383-e39739448e04',
        sendLinkToCustomer:true,
        paymentInstrumentType:'debitCard'
    }
    var extCustomerId='aa7fd74fdaa07f5457937bb1d3d6a536'
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