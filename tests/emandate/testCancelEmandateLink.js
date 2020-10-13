let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../config/credentials.json')[STAGE];
const DvaraGold = require('../../cliient/dvaragold');

async function test(){
    let client = await DvaraGold.Client(config);
    var emandateId='652ba040-f971-11ea-8976-23244329e1f9'
    var extCustomerId='aa7fd74fdaa07f5457937bb1d3d6a536'
    return await client.cancelEmandateLink(emandateId,extCustomerId);
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