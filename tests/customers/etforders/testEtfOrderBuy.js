let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../../config/credentials.json')[STAGE];
const DvaraGold = require('../../../cliient/dvaragold');
const extCustomerId = "c9d518c53c9d22333b89f1094f101f14";
const bullion = {
    bullionShortName: 'G24K',
    bullionName: 'Gold',
    purity: { displayValue: '24Kt - (99.9%)', value: '999' },
    status: 'available',
    isBaseBullion: false,
    id: 'G3'
}

const order = {
    agent: { extAgentId: 'EXTAGT007', name: { first: "Koshi", middle: "Venkateshwara", last: "Shaikh" } },
    bullion: bullion,
    orderTotalValueInr: 500,
    "paymentDetails": {
        "paymentDate": "2020-06-02T12:58:21.280Z",
        "txnReference": "293738",
        "txnDetails": {},
        "paymentInstrumentType": "NEFT",
        "paymentTotalValueInr": 100,

    },
    orderdetail: {"name": "name1"},
    BuyCategory: "ExternalSIP"


}
async function test() {
    let client = await DvaraGold.Client(config);
    return await client.createEtfBuyOrder(extCustomerId, order)
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