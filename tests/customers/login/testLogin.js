let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../../config/credentials.json')[STAGE];
const DvaraGold = require('../../../cliient/dvaragold');

var testLogin = async function () {
    let client = await DvaraGold.Client(config);
    return client.login({
        sessionId:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6Ijk5MjM2OTkzNTYiLCJtZmljb2RlIjoiTUYwMyIsImlhdCI6MTU4NjUwOTY4NywiZXhwIjoxNTg2NTA5ODY3fQ.O5NpMs545FdNN6z5UK1X31d6RU_tWSgzS0Z1pCkQ5Ig',
        otp:225996
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