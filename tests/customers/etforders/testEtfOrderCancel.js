let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../../config/credentials.json')[STAGE];
const DvaraGold = require('../../../cliient/dvaragold');
const extCustomerId = "BMFIBR001CST022";

const orderId = '31e3f560-9b30-11ea-b235-5185d5f36205';

async function test(){
    let client = await DvaraGold.Client(config);
    return await client.cancelEtfOrder(extCustomerId,orderId,"Duplicate Order")
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