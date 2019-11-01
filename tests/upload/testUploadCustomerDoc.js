
const authenticatiion = require('../../auth/authenticate.js');
const extCustomerId = 'BG1234567-000';
const uploadfilePath = 'tests/res/customer.png';
const uploadclient = require('./uploadclient');
(
    async ()=>{
        let apiClient = await authenticatiion.authenticateClientAsync();                
        let result = await uploadclient.uploadClientDocument(apiClient,extCustomerId,uploadfilePath);
        console.log(result);
        let readableUrl = await uploadclient.getReadableUrl(apiClient,result.fetchurl)
        console.log(readableUrl);
        return 0;
    }
)()
.then(()=>{
    process.exit(0)
})
.catch(e=>{
    console.error(e.response.data);
})

