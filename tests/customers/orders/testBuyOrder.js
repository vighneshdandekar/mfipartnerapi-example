let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../../config/credentials.json')[STAGE];
const DvaraGold = require('../../../cliient/dvaragold');

//AAA111CST001
//AAA333CST001
const extCustomerId = "AAA333CST001";
const bullion = {
    "id" : "G3",
    "bullionShortName" : "G22K",
    "bullionName" : "Gold",
    "purity" : {
        "displayValue" : "22Kt (91.6)",
        "value" : "916"
    },
    "status" : "available"
}

async function test(){
    let client = await DvaraGold.Client(config)
    let rates = await client.bookBullionRate(extCustomerId,bullion.bullionName,bullion.id,'buy')
    const aBookedRate = rates[0];
    const _order = {
        agent:{extAgentId:'pwa001-branch-03-ag-01',name:{first:"amit",middle:"",last:"Agent"}}, //An Agent that is not known to MyGold.
        bullion:bullion,
        bullionRateId:aBookedRate.id, //bullion rateid got through rate booking.
        //weightInGm:1,
        //rateInrPerGm:2751,
        orderTotalValueInr:50001,
        buyType:'FixedAmount',        
        //buyType:'FixedWeight',
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
