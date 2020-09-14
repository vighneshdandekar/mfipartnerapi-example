let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../../config/credentials.json')[STAGE];
const DvaraGold = require('../../../cliient/dvaragold');

//AAA111CST001
//AAA333CST001
//pramitcst001
const extCustomerId = "EXT0";
const sipId = "5d267970-f65f-11ea-acf4-5de33991f838";

async function test(){
    let client = await DvaraGold.Client(config)
    return await client.getCustomerSipflexiDetails(extCustomerId, sipId)
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