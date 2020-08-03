
let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../config/credentials.json')[STAGE];
const DvaraGold = require('../../cliient/dvaragold');
const shortid = require('shortid')
const _id = shortid.generate();
const _agents = [
    {
        extAgentId: `${_id}1`, extBranchId: 'EXT002311', name: { first: "Ajay", middle: "", last: "Singh" },
        phone: { mobile: "7276589783" }, email: 'joe@trader.jo',
        address: {
            houseNumber: "1", streetName: "2", district: "Tvm", pinCode: 402202, state: "IN-KL", country: "India", stdCode: 0470
        },
        spouseDetails: {
            name: { first: "Ajay", middle: "", last: "Singh" },
            address: {
                houseNumber: "1", streetName: "2", district: "Tvm", pinCode: 402202, state: "IN-KL", country: "India", stdCode: 0470
            },
        }
    },
    {
        extAgentId: `${_id}2`, extBranchId: 'EXT002311', name: { first: "ajit", middle: "", last: "Singh" },
        phone: { mobile: "7276589783" }, email: 'joe@trader.jo',
        address: {
            houseNumber: "1", streetName: "2", district: "Tvm", pinCode: 402202, state: "IN-KL", country: "India", stdCode: 0470
        },
    },
    {
        extAgentId: `${_id}3`, extBranchId: 'EXT002311', name: { first: "Ajay", middle: "", last: "kumar" },
        phone: { mobile: "7276589783" }, email: 'joe@trader.jo',
        spouseDetails: {
            name: { first: "Ajay", middle: "", last: "Singh" },
            address: {
                houseNumber: "1", streetName: "2", district: "Tvm", pinCode: 402202, state: "IN-KL", country: "India", stdCode: 0470
            },
        },
    }
]


async function test() {
    let client = await DvaraGold.Client(config);
    return await client.saveAgents(_agents);
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