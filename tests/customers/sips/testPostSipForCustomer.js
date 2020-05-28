let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../../config/credentials.json')[STAGE];
const DvaraGold = require('../../../cliient/dvaragold');

//AAA111CST001
//AAA333CST001
//pramitcst001
const extCustomerId = "ext-vighnesh";
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

const sip = {
    "sipName": "FxWt02",
    "milestoneName":"Marriage",
    "bullion": bullion,
    "sipTarget":{"targetType":"FixedWeight","targetQuantityInGm": 4},    
//    "sipTarget":{"targetType":"FixedAmount","targetAmountInr":6000},        
    "sipInstallmentAmtInr": 3000,
    "startDate": "2020-05-28T18:30:00.000Z",
    "paymentPeriodInMths": 6,
    "frequency": "monthly"
}

async function test(){
    let client = await DvaraGold.Client(config)
    return await client.createCustomerSip(extCustomerId,sip)
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