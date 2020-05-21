let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../../config/credentials.json')[STAGE];
const DvaraGold = require('../../../cliient/dvaragold');

//pramitcst001
const extCustomerId = 'AAA333CST001';
const orderId = 'c3f68c90-9b2d-11ea-9ec0-6d63bfbef640';

async function test(){
    let client = await DvaraGold.Client(config)
    return await client.cancelOrder(extCustomerId,orderId, "a duplicate order.  requests cancellation")
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