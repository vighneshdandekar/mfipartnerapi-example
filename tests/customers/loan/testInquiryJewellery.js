let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../../config/credentials.json')[STAGE];
const DvaraGold = require('../../../cliient/dvaragold');
const data = 
    {
        "bullion": {
            bullionShortName: 'G24K',
            bullionName: 'Gold',
            purity: { displayValue: '24Kt - (99.9%)', value: '916' },
            status: 'available',
            isBaseBullion: false,
            id: 'G3'        
        },
        "weightInGm": 5
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