
const authenticatiion = require('../../auth/authenticate.js');
const extAgentId = 'BMFIBR001AG044';
const uploadclient = require('./uploadclient');
const uploadfilePath = 'tests/res/agent.png';
(
    async ()=>{
        let apiClient = await authenticatiion.authenticateClientAsync();                
        let result = await uploadclient.uploadAgentDocument(apiClient,extAgentId,uploadfilePath);
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

