let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../../config/credentials.json')[STAGE];
const DvaraGold = require('../../../cliient/dvaragold');

//AAA111CST001
//AAA333CST001
//pramitcst001
const extCustomerId = "AAA333CST001";
const sipId = "30351ed6-9b2e-11ea-957f-23ae84a083f2";
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

const updated_sip = {
    "sipName": "FixedWt02_updated",
    "milestoneName":"Marriage_updated",
    "bullion": bullion,
//   "sipTarget":{"targetType":"FixedWeight","targetQuantityInGm":16},    
    "sipTarget":{"targetType":"FixedAmount","targetAmountInr":100000},        
    "sipInstallmentAmtInr": 5000,
    "startDate": "2020-05-21T18:30:00.000Z",
    "paymentPeriodInMths": 18,
    "frequency": "monthly"
}

async function test(){
    let client = await DvaraGold.Client(config)
    return await client.updateCustomerSip(extCustomerId, sipId, updated_sip)
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