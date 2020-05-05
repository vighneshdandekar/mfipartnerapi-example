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
async function get(client,api,additionalParametrs){
    return new Promise((resolve,reject)=>{
        client
        .invokeApi(null, api, 'GET',additionalParametrs)
        .then(function (result) {
            resolve(result.data)
        })
        .catch(function (result) {
            reject(getErrorResponse(result));
        });
    })

}
async function post(client,api,parameters){
    return new Promise((resolve,reject)=>{
        client
        .invokeApi(null, api,
            'POST', {},
            parameters
        )
        .then(function (result) {
            resolve(result.data)
        })
        .catch(function (result) {
            reject(getErrorResponse(result));
        });

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
    testSetup(){
        return get(this._client,`/test`)        
    }
    getCustomerInvoiceUrl(customerId,orderid){
        return get(this._client,`/customers/${customerId}/orderinvoice/${orderid}`)        
    }
    createInstantBuyOrder(customerId,order){
        return post(this._client,`/customers/${customerId}/instantorders/buy`,order)
    }    
    createInstntSellOrder(customerId,order){
        return post(this._client,`/customers/${customerId}/instantorders/sell`,order)
    }    
    cancelInstantOrder(customerId,orderId, cancellationReason){
        return post(this._client,`/customers/${customerId}/instantorders/cancel`,{
            id:orderId,
            cancellationreason:cancellationReason
        })
    }    
    getInstantOrder(customerId,orderId){
        return get(this._client,`/customers/${customerId}/instantorders/${orderId}`)
    }
    getInstantOrderList(customerId,orderId){
        return get(this._client,`/customers/${customerId}/instantorders`)
    }

    bookBullionRate(extCustomerId, bullionName,bullionId,rateType){
        const additionalParametrs = {
            queryParams:{
                bullionName:bullionName,
                bullionId:bullionId,
                rateType:rateType
            }
        }    
        return get(this._client,`/customers/${extCustomerId}/bullionrates`,additionalParametrs)
    }
    bookBullionRateBranch(extBranchId, bullionName,bullionId,rateType){
        const additionalParametrs = {
            queryParams:{
                bullionName:bullionName,
                bullionId:bullionId,
                rateType:rateType
            }
        }    
        return get(this._client,`/branches/${extBranchId}/bullionrates`,additionalParametrs)
    }

    getBullions(extCustomerId){
        return get(this._client,`/customers/${extCustomerId}/bullions`,additionalParametrs)
    }
    getPassbook(extCustomerId){
        return get(this._client,`/customers/${extCustomerId}/passbook`)
    }
    createBuyOrder(extCustomerId,order){
        return post(this._client,`/customers/${extCustomerId}/buyorders`,order)
    }
    createSellOrder(extCustomerId,order){
        return post(this._client,`/customers/${extCustomerId}/sellorders`,order)
    }
    cancelOrder(extCustomerid,orderId, cancellationReason){
        return post(this._client,`/customers/${extCustomerid}/cancelorder`,{
            id:orderId,
            cancellationreason:cancellationReason
        })
    }    
    getAgents(){
        return get(this._client,'/agents')
    }
    getAgent(extAgentId){
        return get(this._client,`/agents/${extAgentId}`)
    }
    saveAgents(agents){
        return post(this._client,`/agents`,agents)
    }
    updateAgent(extAgentId,agent){
        return post(this._client,`/agents/${extAgentId}`,agent)
    }
    getBranches(){
        return get(this._client,'/branches')
    }
    getBranch(extBranchId){
        return get(this._client,`/branches/${extBranchId}`)
    }
    saveBranches(branches){
        return post(this._client,`/branches`,branches)
    }
    updateBranch(extBranchId,branch){
        return post(this._client,`/branches/${extBranchId}`,branch)
    }
    getCustomers(){
        return get(this._client,'/customers')
    }
    getCustomer(extCustomerId){
        return get(this._client,`/customers/${extCustomerId}`)
    }
    saveCustomers(customers){
        return post(this._client,`/customers`,customers)
    }
    updateCustomer(extCustomerId,customer){
        return post(this._client,`/customers/${extCustomerId}`,customer)
    }
    requestOtp(phoneNumber){
        return post(this._client,`/customers/requestotp`,{'phoneNumber':phoneNumber})
    }
    login(session){
        return post(this._client,`/customers/login`,session)
    }
    getGatewayConfig(customerId){
        return post(this._client,`/payments/${customerId}/gatewayconfig`,{test:'dummy'})
    }
}

exports.Client = async function(config){
    return new Client(config);
}