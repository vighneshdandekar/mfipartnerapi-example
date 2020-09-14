let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../../config/credentials.json')[STAGE];
const DvaraGold = require('../../../cliient/dvaragold');

//AAA111CST001
//AAA333CST001
//pramitcst001
const extCustomerId = "ext-vighnesh";

async function test(){
    let client = await DvaraGold.Client(config)
    return await client.getCustomerflexiSips(extCustomerId)
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