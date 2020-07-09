let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../../config/credentials.json')[STAGE];
const DvaraGold = require('../../../cliient/dvaragold');
const { CostExplorer } = require('aws-sdk');

let arry = []
function everySec(client) {
    setInterval(async () => {
        for (let i = 1; i <= 4; i++) {
            arry.push((test(client)))
        }

    }, 1000);
}
let table = []
async function everyFive(client) {
    try {
        let start = new Date().getTime()
        everySec(client)
        setTimeout(() => {
            Promise.all(arry).then(values => {
                console.log('promisedAll')
                console.log(values.length)
                let end = new Date().getTime()
                var diffMins = (end - start) / 1000; // minutes
                table.push({ start: start, end: end, orders: values.length, diffSec: diffMins })
                console.table(table)
                process.exit(0)
            })
        }, 5000);
    } catch (e) {
        console.error(e)
    }



}
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

async function test(client) {
    try {
        let rates = await client.bookBullionRate(extCustomerId, bullion.bullionName, bullion.id, 'buy')
        const aBookedRate = rates[0];
        const _order = {
            agent: { extAgentId: 'EXTAGT007', name: { first: "Koshi", middle: "Venkateshwara", last: "Shaikh" } }, //An Agent that is not known to MyGold.
            bullion: bullion,
            bullionRateId: aBookedRate.id, //bullion rateid got through rate booking.
            //weightInGm:1,
            //rateInrPerGm:2751,
            orderTotalValueInr: 5000,
            buyType: 'FixedAmount',
            //buyType:'FixedWeight',
            test: "1234",
            taxRates: aBookedRate.taxRates,
            orderdetail: { "name": "name1" },
            BuyCategory: "Adhoc"


        }
        return client.createBuyOrder(extCustomerId, _order)
    } catch (e) {
        console.error(e)
    }


}
async function count() {
    let client = await DvaraGold.Client(config)

    for await (let i of [1]) {
        everyFive(client)
    }
}
count()