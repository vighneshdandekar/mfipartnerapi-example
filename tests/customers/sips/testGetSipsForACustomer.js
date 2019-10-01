const authenticatiion = require('../../../auth/authenticate.js');
const extCustomerId = 'BMFIBR001CST001';
(async () =>{
    let apiClient = await authenticatiion.authenticateClientAsync();
    let result = apiClient.invokeApi(null,`/customers/${extCustomerId}/sips`,'GET',{},{});
    return result;
})()
.then(result=>{
    console.log(result.data);
    process.exit(0);
})