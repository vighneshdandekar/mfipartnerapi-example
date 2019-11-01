let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../../config/credentials.json')[STAGE];
const DvaraGold = require('../../../cliient/dvaragold');
(async () =>{
    let client = await DvaraGold.Client(config);
    return await client.getCustomerInvoiceUrl('111-000','8a91b370-f95d-11e9-9cd6-c59f906dba93')
})()
.then(result=>{
    console.dir(result)
})
.catch(err=>{
    console.error(err)
})
.finally(()=>{
    process.exit(0);
})