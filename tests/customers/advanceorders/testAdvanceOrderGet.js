let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../../config/credentials.json')[STAGE];
const DvaraGold = require('../../../cliient/dvaragold');
const extCustomerId = "BMFIBR001CST022";

const orderId = '2bdf4dc0-fbc3-11e9-8425-8905e2453fdf';

async function test(){
    let client = await DvaraGold.Client(config);
    return await client.getAdvanceOrder(extCustomerId,orderId)
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