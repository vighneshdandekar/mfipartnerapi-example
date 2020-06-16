let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../../config/credentials.json')[STAGE];
const DvaraGold = require('../../../cliient/dvaragold');
const extCustomerId = "ffa9da6a8375dca831fb3be97291763c";

const orderId = 'fbe0e6d0-9b2f-11ea-b235-5185d5f36205';

async function test(){
    let client = await DvaraGold.Client(config);
    return await client.getEtfOrder(extCustomerId,orderId)
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