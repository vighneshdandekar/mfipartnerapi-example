let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../config/credentials.json')[STAGE];
const DvaraGold = require('../cliient/dvaragold');
const crypto = require('crypto')
async function test(){
    let client = await DvaraGold.Client(config)
    const _order = {
        weightInGm:10,
        rateInrPerGm:2751,
        orderTotalValueInr:1000,
        buyType:'FixedWeight',
        test:"1234"
    }
    var _signature  =  crypto.createHmac(
        'sha256', '1234'
        ).update(JSON.stringify(_order)).digest('hex');

    return await client.testWebhook({
        payload: _order,
        signature: _signature
    })
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
