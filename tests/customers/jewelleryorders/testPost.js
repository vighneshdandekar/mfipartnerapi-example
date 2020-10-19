let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../../config/credentials.json')[STAGE];
const DvaraGold = require('../../../cliient/dvaragold');
const extCustomerId = "ffa9da6a8375dca831fb3be97291763c";
const bullion = {
    bullionShortName: 'G24K',
    bullionName: 'Gold',
    purity: { displayValue: '24Kt - (99.9%)', value: '999' },
    status: 'available',
    isBaseBullion: false,
    id: 'G3'
}

const order = {
    agent: { extAgentId: 'EXTAGT02', name: { first: "Koshi", middle: "Venkateshwara", last: "Shaikh" } },
    // "orderTotalValueInr": 10,
    "jewelleryItems": [
        {
            "jewelleryId": "e0066110-dd2e-11ea-88f6-8bd81abcab40",
            "quantity": 2,
            "bullionRateId": "string",
            // "totalPriceInr": 0,
            // "chargesAmountInr": 0,
            // "taxAmountInr": 0
        }
    ],
    "paymentPlan": {
        "useBullionBalance": [
            {
                "bullion": bullion,
                "maxBullionWtGm": 1
            }
        ],
        "alternatePaymentMode": "partnercollect"
    },
    "jewelleryPaymentDetails": [
        {
            "paymentTotalValueInr": 0,
            "paymentDate": "2020-10-09T07:01:36.801Z",
            "txnReference": "string",
            "txnDetails": {
                "neft_reference": "OC45rt456"
            },
            "paymentInstrumentType": "NEFT"
        }
    ],

    // "shipment": {
    //     "shippingAddress": {
    //         "houseNumber": "string",
    //         "streetName": "string",
    //         "area": "string",
    //         "cityOrVillage": "string",
    //         "postOffice": "string",
    //         "district": "string",
    //         "pinCode": 0,
    //         "state": "IN-AN",
    //         "stdCode": 0,
    //         "landmark": "string",
    //         "country": "string"
    //     },
    //     "shippingCharges": [
    //         {
    //             "type": "making",
    //             "chargesInr": 0,
    //             "taxTotalInr": 0,
    //             "taxes": [
    //                 {
    //                     "taxName": "gst, cess etc",
    //                     "taxCode": "igst, sgst, cgst, utst etc",
    //                     "taxRatePercent": 0,
    //                     "taxAmountInr": 0
    //                 }
    //             ]
    //         }
    //     ]
    // },

    "extReferenceId": "string",
    "orderdetail": {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
    }


}

async function test() {
    let client = await DvaraGold.Client(config);
    let rates = await client.bookBullionRate(extCustomerId, bullion.bullionName, bullion.id, 'jewellery')
    const aBookedRate = rates[0];
    order.jewelleryItems[0].bullionRateId = aBookedRate.id
    return await client.jewelleryCreate(extCustomerId, order)
}
test()
    .then(result => {
        console.dir(result)
    })
    .catch(err => {
        console.error(JSON.stringify(err))
    })
    .finally(() => {
        process.exit(0);
    })