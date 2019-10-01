const authenticatiion = require('../../../auth/authenticate.js');
const extCustomerId = 'BMFIBR001CST001';
const sipId = "9c130a00-deae-11e9-8508-fdeb022e59bb";
(async () =>{
    let apiClient = await authenticatiion.authenticateClientAsync();
    let result = apiClient.invokeApi(null,`/customers/${extCustomerId}/sips/${sipId}`,'DELETE',{},{});
    return result;
})()
.then(result=>{
    console.log(result.data);
    process.exit(0);
})
.catch(e=>{
    console.error(e);
})