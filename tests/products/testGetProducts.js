let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../config/credentials.json')[STAGE];
const DvaraGold = require('../../cliient/dvaragold');

async function test(){
    let client = await DvaraGold.Client(config);
    var queryStringParameters={//This are the optional parameters.
        // category:'coin',
        // bullionName:'Silver',
        // bullionId:'S1'
     }
     var extCustomerId='EXT0'

    return await client.getProducts(queryStringParameters,extCustomerId);
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