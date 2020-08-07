## Using Dvaragold Client as a Proxy Gateway.

You can find a fully working proxy gateway implementation for the Dvara Gold APIs here.  It is written in Javascript for Nodejs runtime environments.

We reommmend you implementing your own REST api client using the examples provided here.  As a convenience utility we are also providing a working copy of a stand alone HTTP Server that can work as a Gateway for Dvara Gold APIs.  You can then communicate just with this HTTP Server without worrying about the URL Signing and timeout management.  Please note that this is provided as a template and you are expected to extend it to match your security and stability requirements.  We DO NOT recommend using the templated server instance in high load scenarios as a proxy.  This proxy server uses a single connection with the Dvara Gold API server.  In high load scenarios we recommend using a pool of connections to distribute the load for better performance.

This approach is useful when the technology stack you are using is not readily usable with the Amazon APi Gateway V4 Signing complexities.  By running a proxy server you get to make standard REST calls to a local server and the server proxies your requests to the Dvaragold APi Gateway.

### Requirements:
- NodejS runtime.
- Node package manager.

### How to run the server.
#### Preparation.
- Copy the complete folder 'proxy-gateway' to the desired location where you want to run the proxy server.
- cd proxy-gateway
- npm install
- Keep a copy of your credentials.json accessible for this server.  You will be passing its location as a parameter to the server.
- You need to now decide the PORT on which you want this server to run.  The default port is 8091
- You need to decide whether the server has a prefix to qualify APIs.  For example /customers can be prefixed as /api/v1/dg/customers.  In this case /api/v1/dg is the prefix.  To invoke the /customers API on Dvara Gold servers , caller will be invoking /api/v1/dg/customers on the proxy server.  The default prefix is /dgapi

The credentials need to be saved as a file in the following format

example: dev.credentials.json
```json
{
    "user":"user@name.here",
    "password":"__passdwor__",
    "userPool":"df-rothy-6_G6780h",
    "appClient":"6745ghtymlls1889405fghts",
    "identityPool":"gh-aptbnbfsfnsknf-fjsdgkk-jdgkj",
    "region":"ng-ghjrt-1",
    "basePath":"https://whatever.isyour.in/base/path/code"
}
```

#### Starting the server.

```bash
node index.js --credentials=./dev.credentials.json --port=5678 --prefix=/api/v2/dg

Setting up REST handlers for /api/v2/dg/*
Authenticating with User Pool
Dvara Gold API Proxy listening at http://127.0.0.1:5678
Getting temporary credentials
Will auto renew token in 2699 seconds
Client token renewed
...
```
Assuming you have the credentials at path './dev.credentials.json' program will start an HTTP server on port 5678.  It will proxy any APIs with a pattern '/api/v1/dg/**' to the Dvara Gold API server in a secure manner and return you back result or error as a JSON object.

Example in Javascript:

Running following code

```js
const _PORT = 5678;
const _API_PREFIX = 'api/v2/dg'
const fetch = require('node-fetch')
fetch(`http://localhost:${_PORT}/${_API_PREFIX}/test`)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err=>{
        console.error(err)
    })
    .finally(()=>{
        process.exit(0)
    })
```

On running this program we get the response back from the Dvara Gold API servers.

```bash
node proxy-gateway/tests/test_setup.js
{ data: 'OK - Good API Call' }
```

will make an API call to the /test end point and return back the results.  The proxy server internally uses dvaragold.js client.  It manages the authentication failures and token renewals internally.  It also takes care of all V4Signing requirements the Amazon APi Gateway requires.
