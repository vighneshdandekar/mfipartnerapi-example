const request = require('request');
const fs = require('fs');
const path = require('path');

async function getReadableUrl(client,fetchurl){
    let result = await client.invokeApi(null,fetchurl,'GET',{},{})
    return result.data.redirect_url;
}
exports.getReadableUrl = getReadableUrl;

async function uploadClientDocument(client, extCustomerId, filePath){
    const signerApi = `/customers/${extCustomerId}/uploaddoc`
    return await uploadFile(signerApi,client,'CUSTOMER_DOC',filePath);
}
exports.uploadClientDocument = uploadClientDocument;

async function uploadBranchDocument(client, extBranchId, filePath){
    const signerApi = `/branches/${extBranchId}/uploaddoc`
    return await uploadFile(signerApi,client,'BRANCH_DOC',filePath);
}
exports.uploadBranchDocument = uploadBranchDocument;

async function uploadAgentDocument(client, extAgentId, filePath){
    const signerApi = `/agents/${extAgentId}/uploaddoc`
    return await uploadFile(signerApi,client,'AGENT_DOC',filePath);
}
exports.uploadAgentDocument = uploadAgentDocument;


async function uploadFile(signerApi,client,fileType,filePath){
    const fileMetadata = {
        type:fileType,
        filename:path.basename(filePath)
    }
    let result = await client.invokeApi(null, 
                                        signerApi, 
                                        'POST', 
                                        {}, 
                                        fileMetadata)
    if(!result || result.status != 200){
        throw new Error("Unable to reserve an upload point for file");
    }
    let data = result.data;
    let uploadUrl = data.uploadurl;
    let s3uploadResult = await uploadClient(uploadUrl,filePath,data.ContentType)
    return {status:'OK',fetchurl:data.fetchurl};
}

async function uploadClient(url,diskFilePath,contentType){
    return new Promise((resolve,reject)=>{
        var stats = fs.statSync(diskFilePath);
        fs.createReadStream(diskFilePath).pipe(request({
            method: 'PUT',
            url: url,
            headers: {
              'Content-Type':contentType,
              'Content-Length': stats['size']
            }
          }, function (err, res, body) {
                if(err || res.statusCode != 200){
                    reject({body:res})
                }
                else{
                    resolve({body:{status:'OK'}})
                }
          }));        
    })
}
