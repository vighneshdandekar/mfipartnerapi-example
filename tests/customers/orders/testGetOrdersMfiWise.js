let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../../config/credentials.json')[STAGE];
const DvaraGold = require('../../../cliient/dvaragold');
(async () =>{
    let client = await DvaraGold.Client(config);
    var queryStringParameters={//This are the optional parameters.
        startDate:new Date("07/1/2020"),
        endDate:new Date("07/16/2020"),
    }
    return await client.getOrdersMfiWise(queryStringParameters)
})()
.then(result=>{
    console.dir(result)
})
.catch(err=>{
    console.error(err)
})
.finally(()=>{
    process.exit(0);
})