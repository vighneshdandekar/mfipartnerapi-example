let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../../config/credentials.json')[STAGE];
const DvaraGold = require('../../../cliient/dvaragold');

//AAA111CST001
//AAA333CST001
//pramitcst001
const extCustomerId = "ext-vighnesh";
const sipId = "cc265d20-a0c1-11ea-93fd-938c18be38b2";

async function test(){
    let client = await DvaraGold.Client(config)
    return await client.getCustomerSipDetails(extCustomerId, sipId)
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