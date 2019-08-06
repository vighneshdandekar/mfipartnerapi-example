## MyGold Client API Reference App

> Simple examples to use the MyGold API.

MyGold API is currently hosted as AWS API GAteway Methods.  Since the AWS API GAteway security require extensive signature computations and verifications
We recommend using AWS [API Gateway Client] (https://www.npmjs.com/package/aws-api-gateway-client) to consume these APIs.  

 * You will get a short JSON snippet with all required IDs and credentials.
 * This snippet need to be used to update config/credentials.json
 * For API Reference please [check this link] (https://app.swaggerhub.com/apis-docs/goldsip8/GoldSipPartnerAPIs/1.0.1)
 


## Usage

###Authenticating and getting a client reference

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
###Authenticating and getting a client reference

Using the authenticated client to fetch data from REST API endpoint.  Here the code here is using [/branches] api call to fetch back all existing branches inside your MFI organization.

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



