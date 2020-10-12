let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../config/credentials.json')[STAGE];
const DvaraGold = require('../../cliient/dvaragold');

async function test(){
    let client = await DvaraGold.Client(config);
    var productId='49e63f00-7967-11ea-a361-6f3a775c8435';
    var extCustomerId='EXT0'
    return await client.getProduct(productId,extCustomerId);
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