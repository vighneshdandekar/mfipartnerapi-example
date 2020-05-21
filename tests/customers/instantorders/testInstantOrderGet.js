let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../../config/credentials.json')[STAGE];
const DvaraGold = require('../../../cliient/dvaragold');
const extCustomerId = "ffa9da6a8375dca831fb3be97291763c";

const orderId = 'f2d105b0-fcac-11e9-adbb-0da0d7fdb537';

async function test(){
    let client = await DvaraGold.Client(config);
    return await client.getInstantOrder(extCustomerId,orderId)
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