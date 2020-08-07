## MyGold Client API Reference App

> Simple examples to use the MyGold API.

MyGold API is currently hosted as AWS API GAteway Methods.  Since the AWS API GAteway security require extensive signature computations and verifications
We recommend using AWS [API Gateway Client](https://www.npmjs.com/package/aws-api-gateway-client) to consume these APIs.  

 * You will get a short JSON snippet with all required IDs and credentials.
 * This snippet need to be used to update config/credentials.json
 * For API Reference please [check this link](https://app.swaggerhub.com/apis-docs/goldsip8/GoldSipPartnerAPIs/1.1.0)
 * The example project is written in Javascript targetting [nodejs](https://nodejs.org/en/) runtime.  It uses [aws-sdk](https://aws.amazon.com/sdk-for-node-js/) for authentication as well as communication with APIs.
 * The same techniques can be implemented in any programming language using many other appropriate client libraries capable of authenticated REST API Calls.
 
## Quick Start
 1. Download and install latest [nodejs](https://nodejs.org/en/) for your target platform.
 2. Git clone this project to your computer
   ```
   git clone https://github.com/goldsip/mfipartnerapi-example.git ./
   ```
 3. On the command line go to the folder where the project is cloned.
 4. Execute the following command to download and save all required nodejs dependencies.
    ```
    npm install  
    ```
 5. Update the **config/credentials.json**.  You would have received a JSON snippet with your specific access credentials.
    ***

    > Default "Credential Profile" used is "test" and will work correctly with your default credentials.json.  You can setup multiple profiles if system has provided you more than one "credential".  For example to manage Staging Vs. Production APIs.  Profile switching is managed using an environment variable - **mygold_stage** .  You can add this environment variable with appropriate profile name to use a different credential.
    [How to setup environment variables](https://www.schrodinger.com/kb/1842)
    
    ```bash
    #UNIX, bash shell
    #To use dev profile in credentials.json (UNIX, bash shell)
    mygold_stage=dev
    export mygold_stage

    ```

    ```bash
    #UNIX, bash shell
    #To use test profile in credentials.json (This is default)
    mygold_stage=test
    export mygold_stage

    ```
    ***

   ```json
    {
        "dev":{

        },    
        "test":{
            "user":"AAAAAAA",
            "password":"BBBBBB",
            "userPool":"CCCCCCCC",
            "appClient":"DDDDDDD",
            "identityPool":"EEEEEEEE",
            "region":"FFFFFF",
            "basePath":"https://testapi.mygold.co.in/test/partners/XXXX"
        },
        "prod":{

        }
    }
   ```  

***

> If **config/credentials.json** does not exist in your cloned repository, create one.  This file is excluded from the code repository because of the confidential nature of credential information.  DO NOT PUBLISH your credentials.json to a public repository.  Keep it safe and protected.

***
      
 6. You can now run a basic test case that will check
    1. Your configuration is updated correctly (**config/credentials.json**).
    2. Your credentials are correct and is usable with API server.
    3. You are able to use the APIs that you have access to.
    ```bash
    ~/src/mfipartnerapi-example$ node tests/testSetup.js 
    Authenticating with User Pool
    Getting temporary credentials
    OK - Good API Call    
    ``` 
    Expected output is : OK - Good API Call

 **If you face problems contact our technical team to help you**

## Usage

### Authenticating and getting a client reference

authenticate.js uses the credentials and configuration data saved to config/credentials.json to initialize a client instance.  This is returned through a callback.

```js
//Config and Authentication library.
let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../config/credentials.json')[STAGE];
const DvaraGold = require('../cliient/dvaragold');

async function test(){
    let client = await DvaraGold.Client(config);
    return await client.testSetup()
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
```
### Using client to access API Methods

Using the authenticated client to fetch data from REST API endpoint.  Here the code here is using [/branches](https://app.swaggerhub.com/apis-docs/goldsip8/GoldSipPartnerAPIs/1.0.0#/Branch/getBranches) api call to fetch back all existing branches inside your MFI organization.

```js
    let client = await DvaraGold.Client(config);
    return await client.getBranches();
```

Here the code here is using [/branches](https://app.swaggerhub.com/apis-docs/goldsip8/GoldSipPartnerAPIs/1.0.0#/Branch/addBranches) api call to upload (POST) branches to your MFI organization.

```js
    var _id = shortid.generate();
    /**
     * Generating random test data.
     */
    const _branches = [
        {extBranchId: `${_id}1`, name:`Branch - (${_id}1`  },
        {extBranchId: `${_id}2`, name:`Branch - (${_id}2`  },
        {extBranchId: `${_id}3`, name:`Branch - (${_id}3`  }
    ]
    client.saveBranches(_branches)
```
### Using client to Upload a document.

For certain entities there could be one or many binary attachments.  For example a customer can have photo or scanned identity
documents attached.  You can use corresponding API calls to upload/retrive such documents.

#### [Customer](https://app.swaggerhub.com/apis-docs/goldsip8/GoldSipPartnerAPIs/1.0.0#/Customer/uploadCustomerDoc)

Authorize secure upload of a customer's binary document such a photograpgh, or identification proof scan        
to the storage.  These uploads are a two step process.  In the first step an authorization is completed.
On successful authorization caller will receive an upload endpoint (URL).  A 'PUT' operation is expected to
this URL with the file binary data.  

We highly recommend using the client library [uploadclient.js](https://github.com/goldsip/mfipartnerapi-example/blob/master/tests/upload/uploadclient.js) for uploads.  If you are rolling your own upload 
routine using this API the following parameter is important.

UploadDocRequest.type should be 'CUSTOMER_DOC'


[Example](https://github.com/goldsip/mfipartnerapi-example/blob/master/tests/upload/testUploadCustomerDoc.js)

```js
        let apiClient = await authenticatiion.authenticateClientAsync();                
        let result = await uploadclient.uploadClientDocument(apiClient,extCustomerId,uploadfilePath);
        console.log(result);
```


#### [Branch](https://app.swaggerhub.com/apis-docs/goldsip8/GoldSipPartnerAPIs/1.0.0#/Upload/uploadBranchDoc)

Authorize secure upload of a branch's binary document such an identification proof scan        
to the storage.  These uploads are a two step process.  In the first step an authorization is completed.
On successful authorization caller will receive an upload endpoint (URL).  A 'PUT' operation is expected to
this URL with the file binary data.  

We highly recommend using the client library [uploadclient.js](https://github.com/goldsip/mfipartnerapi-example/blob/master/tests/upload/uploadclient.js) for uploads.  If you are rolling your own upload 
routine using this API the following parameter is important.

UploadDocRequest.type should be 'BRANCH_DOC'


[Example](https://github.com/goldsip/mfipartnerapi-example/blob/master/tests/upload/testUploadBranchDoc.js)

```js
    let apiClient = await authenticatiion.authenticateClientAsync();                
    let result = await uploadclient.uploadBranchDocument(apiClient,extBranchId,uploadfilePath);
    console.log(result);    
```

#### [Agent](https://app.swaggerhub.com/apis-docs/goldsip8/GoldSipPartnerAPIs/1.0.0#/Upload/uploadAgentDoc)

Authorize secure upload of a agent's binary document such a photograpgh, or identification proof scan        
to the storage.  These uploads are a two step process.  In the first step an authorization is completed.
On successful authorization caller will receive an upload endpoint (URL).  A 'PUT' operation is expected to
this URL with the file binary data.  

We highly recommend using the client library [uploadclient.js](https://github.com/goldsip/mfipartnerapi-example/blob/master/tests/upload/uploadclient.js) for uploads.  If you are rolling your own upload 
routine using this API the following parameter is important.

UploadDocRequest.type should be 'AGENT_DOC'


[Example](https://github.com/goldsip/mfipartnerapi-example/blob/master/tests/upload/testUploadAgentDoc.js)

```js
    let apiClient = await authenticatiion.authenticateClientAsync();                
    let result = await uploadclient.uploadAgentDocument(apiClient,extAgentId,uploadfilePath);
    console.log(result);
```


## Using Dvaragold Client as a REST Proxy Gateway.

You can find a fully working proxy gateway implementation in the [proxy-gateway](https://github.com/Entelligentsia/mfipartnerapi-example/tree/master/proxy-gateway) folder.  It is written in Javascript for Nodejs runtime environments.

We reommmend you implementing your own REST api client using the examples provided here.  As a convenience utility we are also providing a working copy of a stand alone HTTP Server that can work as a Gateway for Dvara Gold APIs.  You can then communicate just with this HTTP Server without worrying about the URL Signing and timeout management.  Please note that this is provided as a template and you are expected to extend it to match your security and stability requirements.  We DO NOT recommend using the templated server instance in high load scenarios as a proxy.  This proxy server uses a single connection with the Dvara Gold API server.  In high load scenarios we recommend using a pool of connections to distribute the load for better performance.

This approach is useful when the technology stack you are using is not readily usable with the Amazon APi Gateway V4 Signing complexities.  By running a proxy server you get to make standard REST calls to a local server and the server proxies your requests to the Dvaragold APi Gateway.

