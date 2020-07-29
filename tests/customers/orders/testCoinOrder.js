let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../../config/credentials.json')[STAGE];
const DvaraGold = require('../../../cliient/dvaragold');

//AAA111CST001
//AAA333CST001
const extCustomerId = "ext-vighnesh";
const bullion = {
    "id": "G3",
    "bullionShortName": "G22K",
    "bullionName": "Gold",
    "purity": {
        "displayValue": "22Kt (91.6)",
        "value": "916"
    },
    "status": "available"
}

async function test() {
    let client = await DvaraGold.Client(config)
    let rates = await client.bookBullionRate(extCustomerId, bullion.bullionName, bullion.id, 'buy')
    const aBookedRate = rates[0];
    const _order = {
        agent: { extAgentId: 'EXTAGT007', name: { first: "Koshi", middle: "Venkateshwara", last: "Shaikh" } }, //An Agent that is not known to MyGold.
        bullion: bullion, //need a valid bullion id
        bullionRateId: aBookedRate.id, //bullion rateid got through rate booking.
        weightInGm: 1,
        rateInrPerGm: 2751,
        orderTotalValueInr: 1000,  //can be 0 to skip an installment.                           
        taxRates: aBookedRate.taxRates,
        orderdetail: { "name": "name2" },


        coinInventoryIds: [
            {
                "coinSpecification": {
                    "bullionDetails": bullion,
                    "design": "religious",
                    "name": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    "weightInGm": 0,
                    "makingChargesInr": 0,
                    "image": "string"
                },
                "quantity": 10
            }
        ],
        shipment: {
            "shippingAddress": {
                "houseNumber": "string",
                "streetName": "string",
                "area": "string",
                "cityOrVillage": "string",
                "postOffice": "string",
                "district": "string",
                "pinCode": 0,
                "state": "string",
                "stdCode": 0,
                "landmark": "string",
                "country": "string"
            },
            "shippingCharges": 0
        }
    }
    return await client.createCoinOrder(extCustomerId, _order)
}

test()
    .then(result => {
        console.dir(result)
    })
    .catch(err => {
        console.error(err)
    })
    .finally(() => {
        process.exit(0);
    })
