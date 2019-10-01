const authenticatiion = require('../../../auth/authenticate.js');
const extCustomerId = 'BMFIBR001CST001';
const orderId = 'c46f8a20-e433-11e9-9973-9783595f5c2d';
(async () =>{
    let apiClient = await authenticatiion.authenticateClientAsync();
    /**
     * A NEw ORDER CAN BE CANCELLED FOR SOME TIME AFTER SENDING TO THE CREATE API.
     * YOU NEED TO POST THE ORDER ID (id) OF THE NEW ORDER TO CANCEL AN ORDER
     * https://app.swaggerhub.com/apis-docs/goldsip8/GoldSipPartnerAPIs/1.0.0#/Order/cancelCustomerOrder
     */
    let result = apiClient.invokeApi(null,`/customers/${extCustomerId}/cancelorder`,'POST',{},{
        id:orderId,
        cancellationreason: "a duplicate order.  requests cancellation"
    });
    return result;
})()
.then(result=>{
    console.log(result.data);
    process.exit(0);
})
.catch(e=>{
    console.dir(e.response.data);
})