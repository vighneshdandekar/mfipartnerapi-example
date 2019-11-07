const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const AWSCognito = require("amazon-cognito-identity-js");
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const apigClientFactory = require("aws-api-gateway-client").default;
const AWS = require('aws-sdk');
global.fetch = require('node-fetch')

function authenticate(config,callback) {
    const poolData = {
        UserPoolId: config.userPool,
        ClientId: config.appClient
    };
    
    AWS.config.update({ region: config.region });
    var userPool = new AWSCognito.CognitoUserPool(poolData);

    var userData = {
        Username: config.user,
        Pool: userPool
    };
    var authenticationData = {
        Username: config.user,
        Password: config.password
    };
    var authenticationDetails = new AWSCognito.AuthenticationDetails(
        authenticationData
    );

    var cognitoUser = new AWSCognito.CognitoUser(userData);

    console.log("Authenticating with User Pool");

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            callback({
                idToken: result.getIdToken().getJwtToken(),
                accessToken: result.getAccessToken().getJwtToken()
            });
        },
        onFailure: function (err) {
            console.log(err.message ? err.message : err);
        },
        newPasswordRequired: function () {
            console.log("Given user needs to set a new password");
        },
        mfaRequired: function () {
            console.log("MFA is not currently supported");
        },
        customChallenge: function () {
            console.log("Custom challenge is not currently supported");
        }
    });
}

function getCredentials(config, userTokens, callback) {
    console.log("Getting temporary credentials");

    var logins = {};
    var idToken = userTokens.idToken;
    var accessToken = userTokens.accessToken;

    logins[
        "cognito-idp." + config.region + ".amazonaws.com/" + config.userPool
    ] = idToken;

    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: config.identityPool,
        Logins: logins
    });

    AWS.config.credentials.get(function (err) {
        if (err) {
            console.log(err.message ? err.message : err);
            return;
        }

        callback(userTokens);
    });
}

function authenticateClient (config,callback) {
    authenticate(config,function (tokens) {
        getCredentials(config,tokens, function (_tokens) {
            var credentials = AWS.config.credentials;
            var apigClient = apigClientFactory.newClient({
                accessKey: credentials.accessKeyId,
                secretKey: credentials.secretAccessKey,
                sessionToken: credentials.sessionToken,
                region: config.region,
                invokeUrl: `${config.basePath}`,
            });
            callback(null, apigClient);
        })
    })
}

async function authenticateClientAsync(config){
    return new Promise((resolve,reject)=>{
        try{
            authenticateClient(config,function(err,client){
                if(err || !client){
                    reject(err ? err : "Unable to authenticate");
                }
                else{
                    resolve(client);
                }
            })
        }
        catch(e){
            reject(e);
        }
    })
}
function getErrorResponse(result){
    if(result.response){
        return{
            status: result.response.status,
            statusText: result.response.statusText,
            data: result.response.data
        } 
    }
    else{
        return result.message;
    }
}

class Client{        
    constructor(config){
        this._config = config;
        return new Promise((resolve,reject)=>{
            authenticateClientAsync(this._config)
                .then(_client=>{
                    this._client = _client;
                    resolve(this);
                })
                .catch(e=>{
                    reject(e);
                })
            
        })
    }
    getCustomerInvoiceUrl(customerId,orderid){        
        return new Promise((resolve,reject)=>{
            this._client
            .invokeApi(null, `/customers/${customerId}/orderinvoice/${orderid}`, 'GET')
            .then(function (result) {
                resolve(result.data)
            })
            .catch(function (result) {
                reject(getErrorResponse(result));
            });
        })
    }
    createInstantBuyOrder(customerId,order){
        return new Promise((resolve,reject)=>{
            this._client
            .invokeApi(null, `/customers/${customerId}/instantorders/buy`,
                'POST', {},
                order
            )
            .then(function (result) {
                resolve(result.data)
            })
            .catch(function (result) {
                reject(getErrorResponse(result));
            });
    
        })
    }    
    createInstntSellOrder(customerId,order){
        return new Promise((resolve,reject)=>{
            this._client
            .invokeApi(null, `/customers/${customerId}/instantorders/sell`,
                'POST', {},
                order
            )
            .then(function (result) {
                resolve(result.data)
            })
            .catch(function (result) {
                reject(getErrorResponse(result));
            });
    
        })
    }    
    cancelInstantOrder(customerId,orderId, cancellationReason){
        return new Promise((resolve,reject)=>{
            this._client
            .invokeApi(null, `/customers/${customerId}/instantorders/cancel`,
                'POST', {},
                {
                    id:orderId,
                    cancellationreason:cancellationReason
                }
            )
            .then(function (result) {
                resolve(result.data)
            })
            .catch(function (result) {
                reject(getErrorResponse(result));
            });
    
        })
    }    
    getInstantOrder(customerId,orderId){
        return new Promise((resolve,reject)=>{
            this._client
            .invokeApi(null, `/customers/${customerId}/instantorders/${orderId}`, 'GET')
            .then(function (result) {
                resolve(result.data)
            })
            .catch(function (result) {
                reject(getErrorResponse(result));
            });
        })
    }
    getInstantOrderList(customerId,orderId){
        return new Promise((resolve,reject)=>{
            this._client
            .invokeApi(null, `/customers/${customerId}/instantorders`, 'GET')
            .then(function (result) {
                resolve(result.data)
            })
            .catch(function (result) {
                reject(getErrorResponse(result));
            });
        })
    }

    bookBullionRate(extCustomerId, bullionName,bullionId,rateType){
        const additionalParametrs = {
            queryParams:{
                bullionName:bullionName,
                bullionId:bullionId,
                rateType:rateType
            }
        }    
        return new Promise((resolve,reject)=>{
            this._client
            .invokeApi(null, `/customers/${extCustomerId}/bullionrates`, 'GET',additionalParametrs)
            .then(function (result) {
                resolve(result.data)
            })
            .catch(function (result) {
                reject(getErrorResponse(result));
            });
        })

    }

    createBuyOrder(extCustomerId,order){
        return new Promise((resolve,reject)=>{
            this._client
            .invokeApi(null, `/customers/${extCustomerId}/buyorders`,'POST', {},order)
            .then(function (result) {
                resolve(result.data)
            })
            .catch(function (result) {
                reject(getErrorResponse(result));
            });
        })

    }
}

exports.Client = async function(config){
    return new Client(config);
}