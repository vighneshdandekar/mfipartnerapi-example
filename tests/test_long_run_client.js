let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../config/credentials.json')[STAGE];
const DvaraGold = require('../cliient/dvaragold');

let client = null;

const ONEDAY = 24 * 60 * 60 * 1000;
const MINUTE = 1 * 60 * 1000;

const CALL_API_INTERVAL_MS = 5 * MINUTE;
const PROCESS_EXIT_INTERVAL = 1 * ONEDAY

async function runTest(){
    while(true){
        let result = await client.testSetup()
        console.dir(result);
        await new Promise(r => setTimeout(r, CALL_API_INTERVAL_MS));
    }
}

async function test(){
    client = await DvaraGold.Client(config);
    setTimeout(function(){
        console.log(`Exiting program as planned.`)
    }, PROCESS_EXIT_INTERVAL)
    console.log('\x1b[36m%s\x1b[0m',`Program will make an API call every ${CALL_API_INTERVAL_MS / MINUTE} minute(s)`)
    console.log('\x1b[36m%s\x1b[0m',`Program will auto exit in ${PROCESS_EXIT_INTERVAL / ONEDAY} day(s)`)
    await runTest();
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
