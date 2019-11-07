let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../../config/credentials.json')[STAGE];
const DvaraGold = require('../../../cliient/dvaragold');
const async = require('async');
const bookbullionrate = require('./bookbullionrate');

const extCustomerId = "BMFIBR001CST022";
const bullion = {
    "id" : "G3",
    "bullionShortName" : "G24K",
    "bullionName" : "Gold",
    "purity" : {
        "displayValue" : "24Kt (99.9%)",
        "value" : "999"
    },
    "status" : "available"
}

async function test(){
    let client = await DvaraGold.Client(config)
    let rates = await client.bookBullionRate(extCustomerId,bullion.bullionName,bullion.id,'buy')
    const aBookedRate = rates[0];
    const _order = {
        agent:{extAgentId:'EXTAGT007',name:{first:"Koshi",middle:"Venkateshwara",last:"Shaikh"}}, //An Agent that is not known to MyGold.
        bullion:bullion,
        bullionRateId:aBookedRate.id, //bullion rateid got through rate booking.
        weightInGm:10,
        rateInrPerGm:2751,
        //orderTotalValueInr:1000,
        buyType:'FixedWeight',
        test:"1234",
        taxRates:aBookedRate.taxRates
    }
    return await client.createBuyOrder(extCustomerId,_order)
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
