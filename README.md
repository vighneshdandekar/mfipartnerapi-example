## MyGold Client API Reference App

> Simple examples to use the MyGold API.

MyGold API is currently hosted as AWS API GAteway Methods.  Since the AWS API GAteway security require extensive signature computations and verifications
We recommend using AWS [API Gateway Client](https://www.npmjs.com/package/aws-api-gateway-client) to consume these APIs.  

 * You will get a short JSON snippet with all required IDs and credentials.
 * This snippet need to be used to update config/credentials.json
 * For API Reference please [check this link](https://app.swaggerhub.com/apis-docs/goldsip8/GoldSipPartnerAPIs/1.0.1)
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
   ```js
    {
        "dev":{

        },    
        "test":{
            "user":"**AAAAAAA**",
            "password":"**BBBBBB**",
            "userPool":"**CCCCCCCC**",
            "appClient":"**DDDDDDD**",
            "identityPool":"**EEEEEEEE**",
            "region":"**FFFFFF**",
            "basePath":"**https://testapi.mygold.co.in/test/partners/XXXX**"
        },
        "prod":{

        }
    }
   ```  
> <p style="color:red;">If **config/credentials.json** does not exist in your cloned repository, create one.  This file is excluded from the code repository because of the 
   > confidential nature of credential information.  DO NOT PUBLISH your credentials.json to a public repository.  Keep it safe and protected.</p>
      
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
const authenticatiion = require('../auth/authenticate.js');

//
authenticatiion.authenticateClient(function (err, client) {
    if (client) {
        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(JSON.stringify(body));
            }
        }
        //Now you can use the client to consume APIs.
    }
    else {
        console.error(err);
    }
})
```
### Using client to access API Methods

Using the authenticated client to fetch data from REST API endpoint.  Here the code here is using [/branches](https://app.swaggerhub.com/apis-docs/goldsip8/GoldSipPartnerAPIs/1.0.1#/Branch/getBranches) api call to fetch back all existing branches inside your MFI organization.

```js
    client
        .invokeApi(null, '/branches', 'GET')
        .then(function (result) {
            console.log(result.data)
        })
        .catch(function (result) {
            if (result.response) {
                console.dir({
                    status: result.response.status,
                    statusText: result.response.statusText,
                    data: result.response.data
                });
            } else {
                console.log(result.message);
            }
        });
```

Here the code here is using [/branches](https://app.swaggerhub.com/apis-docs/goldsip8/GoldSipPartnerAPIs/1.0.1#/Branch/addBranches) api call to upload (POST) branches to your MFI organization.

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
    client
        .invokeApi(null, '/branches', 'POST', {}, _branches)
        .then(function (result) {
            console.log(result.data)
        })
        .catch(function (result) {
            if (result.response) {
                console.dir({
                    status: result.response.status,
                    statusText: result.response.statusText,
                    data: result.response.data
                });
            } else {
                console.log(result.message);
            }
        });
```



