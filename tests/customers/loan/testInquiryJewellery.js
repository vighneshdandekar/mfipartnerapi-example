let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../../config/credentials.json')[STAGE];
const DvaraGold = require('../../../cliient/dvaragold');
const data = 
    {
        agent: { extAgentId: 'EXTAGT02', name: { first: "Koshi", middle: "Venkateshwara", last: "Shaikh" } },

        "paymentPlan": {
          "useBullionBalance": 
            {
              "bullion": {
                bullionShortName: 'G22K',
                bullionName: 'Gold',
                purity: { displayValue: '22Kt (91.6%)', value: '916' },
                status: 'available',
                isBaseBullion: false,
                id: 'G3'                    
              },
              "maxBullionWtGm":3
            }
          ,
        //   "alternatePaymentMode": "partnercollect"
        },
        "jewelleryPaymentDetails": [
          {
            "paymentTotalValueInr": 0,
            "paymentDate": "2020-10-16T13:55:46.579Z",
            "txnReference": "string",
            "txnDetails": {
              "neft_reference": "OC45rt456"
            },
            "paymentInstrumentType": "NEFT"
          }
        ],
        "extReferenceId": "string",
        "orderdetail": {
          "additionalProp1": "string",
          "additionalProp2": "string",
          "additionalProp3": "string"
        }

    }

const extCustomerId='EXT0'
async function test() {
    let client = await DvaraGold.Client(config);
    return await client.inquiryJewellery(extCustomerId, data)
}
test()
    .then(result => {
        console.log(result)
    })
    .catch(err => {
        console.error(err)
    })
    .finally(() => {
        process.exit(0);
    })