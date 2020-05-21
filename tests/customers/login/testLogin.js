let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../../config/credentials.json')[STAGE];
const DvaraGold = require('../../../cliient/dvaragold');

var testLogin = async function () {
    let client = await DvaraGold.Client(config);
    return client.login({
        sessionId:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6Ijk5MjM2OTkzNTYiLCJtZmljb2RlIjoiTUYwMyIsImlhdCI6MTU4ODkzNDU0MiwiZXhwIjoxNTg4OTM1NDQyfQ.WSN49bfZYwPAQUt_RWjHRUUipGvbmvTjQjx0wI_ifqo',
        otp:474596,
        deviceId: '1234',
        fcmToken: "1837381"
    })
}

testLogin()
.then(result=>{
    console.dir(result)
})
.catch(err=>{
    console.error(err)
})
.finally(()=>{
    process.exit(0);
})