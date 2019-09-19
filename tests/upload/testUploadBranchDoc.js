
const authenticatiion = require('../../auth/authenticate.js');
const extBranchId = 'BR001';
const uploadfilePath = 'tests/res/branch.png';
const uploadclient = require('./uploadclient');
(
    async ()=>{
        let apiClient = await authenticatiion.authenticateClientAsync();                
        let result = await uploadclient.uploadBranchDocument(apiClient,extBranchId,uploadfilePath);
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
    console.error(e.message);
})

