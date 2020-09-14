"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AmazonCognitoIdentity = require('amazon-cognito-identity-js');

var AWSCognito = require("amazon-cognito-identity-js");

var CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;

var apigClientFactory = require("aws-api-gateway-client")["default"];

var ON_ERROR_RECONNECT_DELAY = 60 * 1000;

var AWS = require('aws-sdk');

global.fetch = require('node-fetch');

function authenticate(config, callback) {
  var poolData = {
    UserPoolId: config.userPool,
    ClientId: config.appClient
  };
  AWS.config.update({
    region: config.region
  });
  var userPool = new AWSCognito.CognitoUserPool(poolData);
  var userData = {
    Username: config.user,
    Pool: userPool
  };
  var authenticationData = {
    Username: config.user,
    Password: config.password
  };
  var authenticationDetails = new AWSCognito.AuthenticationDetails(authenticationData);
  var cognitoUser = new AWSCognito.CognitoUser(userData);
  console.log("Authenticating with User Pool");
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function onSuccess(result) {
      callback(null, {
        idToken: result.getIdToken().getJwtToken(),
        accessToken: result.getAccessToken().getJwtToken()
      });
    },
    onFailure: function onFailure(err) {
      console.log(err.message ? err.message : err);
      callback(err, null);
    },
    newPasswordRequired: function newPasswordRequired() {
      console.log("Given user needs to set a new password");
      callback("Given user needs to set a new password", null);
    },
    mfaRequired: function mfaRequired() {
      console.log("MFA is not currently supported");
      callback("MFA is not currently supported", null);
    },
    customChallenge: function customChallenge() {
      console.log("Custom challenge is not currently supported");
      callback("Custom challenge is not currently supported", null);
    }
  });
}

function getCredentials(config, userTokens, callback) {
  console.log("Getting temporary credentials");
  var logins = {};
  var idToken = userTokens.idToken;
  var accessToken = userTokens.accessToken;
  logins["cognito-idp." + config.region + ".amazonaws.com/" + config.userPool] = idToken;
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: config.identityPool,
    Logins: logins
  });
  AWS.config.credentials.get(function (err) {
    if (err) {
      console.log(err.message ? err.message : err);
      callback(err, null);
      return;
    }

    callback(null, userTokens);
  });
}

function authenticateClient(config, callback) {
  authenticate(config, function (err, tokens) {
    if (err) {
      callback(err, null);
      return;
    }

    getCredentials(config, tokens, function (err, _tokens) {
      if (err) {
        callback(err, null);
        return;
      }

      var credentials = AWS.config.credentials;
      var apigClient = apigClientFactory.newClient({
        accessKey: credentials.accessKeyId,
        secretKey: credentials.secretAccessKey,
        sessionToken: credentials.sessionToken,
        region: config.region,
        invokeUrl: "".concat(config.basePath)
      });
      callback(null, apigClient, credentials.expireTime);
    });
  });
}

function authenticateClientAsync(config) {
  return regeneratorRuntime.async(function authenticateClientAsync$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", new Promise(function (resolve, reject) {
            try {
              authenticateClient(config, function (err, client, expireTime) {
                if (err || !client) {
                  reject(err ? err : "Unable to authenticate");
                } else {
                  resolve({
                    client: client,
                    expireTime: expireTime
                  });
                }
              });
            } catch (e) {
              reject(e);
            }
          }));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
}

function get(client, api, additionalParametrs) {
  return regeneratorRuntime.async(function get$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", new Promise(function (resolve, reject) {
            client.invokeApi(null, api, 'GET', additionalParametrs).then(function (result) {
              resolve(result.data);
            })["catch"](function (result) {
              reject(getErrorResponse(result));
            });
          }));

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function post(client, api, parameters) {
  return regeneratorRuntime.async(function post$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          return _context3.abrupt("return", new Promise(function (resolve, reject) {
            client.invokeApi(null, api, 'POST', {}, parameters).then(function (result) {
              resolve(result.data);
            })["catch"](function (result) {
              reject(getErrorResponse(result));
            });
          }));

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function put(client, api, parameters) {
  return regeneratorRuntime.async(function put$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          return _context4.abrupt("return", new Promise(function (resolve, reject) {
            client.invokeApi(null, api, 'PUT', {}, parameters).then(function (result) {
              resolve(result.data);
            })["catch"](function (result) {
              reject(getErrorResponse(result));
            });
          }));

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function _delete(client, api, parameters) {
  return regeneratorRuntime.async(function _delete$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          return _context5.abrupt("return", new Promise(function (resolve, reject) {
            client.invokeApi(null, api, 'DELETE', {}, parameters).then(function (result) {
              resolve(result.data);
            })["catch"](function (result) {
              reject(getErrorResponse(result));
            });
          }));

        case 1:
        case "end":
          return _context5.stop();
      }
    }
  });
}

function getErrorResponse(result) {
  if (result.response) {
    return {
      status: result.response.status,
      statusText: result.response.statusText,
      data: result.response.data
    };
  } else {
    return result.message;
  }
}

var Client =
/*#__PURE__*/
function () {
  function Client(config) {
    _classCallCheck(this, Client);

    this._config = config;
    var self = this;
    return new Promise(function (resolve, reject) {
      self.renewClientToken(function (err, status) {
        resolve(self);
      });
    });
  }

  _createClass(Client, [{
    key: "renewClientToken",
    value: function renewClientToken(callback) {
      var _this = this;

      authenticateClientAsync(this._config).then(function (data) {
        var client = data.client,
            expireTime = data.expireTime;
        _this._client = client;

        if (expireTime) {
          var _renew = parseInt((expireTime.getTime() - Date.now()) * 75 / 100);

          setTimeout(function (dg) {
            dg.renewClientToken(callback);
          }, _renew, _this);
          console.log('\x1b[33m%s\x1b[33m', "Will auto renew token in ".concat(parseInt(_renew / 1000), " seconds"));
        }

        console.log('Client token renewed');
        if (callback) callback(null, true);
      })["catch"](function (e) {
        console.error(e);
        console.log("Token renewal failed. Client unusable @ ".concat(new Date()));
        setTimeout(function (dg) {
          dg.renewClientToken(callback);
        }, ON_ERROR_RECONNECT_DELAY, _this);
        console.log("Will try to reconnect in ".concat(ON_ERROR_RECONNECT_DELAY));
      });
    }
  }, {
    key: "_GET",
    value: function _GET(api, queryParameters) {
      return get(this._client, api, queryParameters);
    }
  }, {
    key: "_POST",
    value: function _POST(api, parameters) {
      return post(this._client, api, parameters);
    }
  }, {
    key: "_DELETE",
    value: function _DELETE(api, parameters) {
      return _delete(this._client, api, parameters);
    }
  }, {
    key: "_PUT",
    value: function _PUT(api, parameters) {
      return put(this._client, api, parameters);
    }
  }, {
    key: "testSetup",
    value: function testSetup() {
      return get(this._client, "/test");
    }
  }, {
    key: "addPaymentDetails",
    value: function addPaymentDetails(details) {
      return post(this._client, "/orders/addPaymentDetails", details);
    }
  }, {
    key: "getCustomerInvoiceUrl",
    value: function getCustomerInvoiceUrl(customerId, orderid) {
      return get(this._client, "/customers/".concat(customerId, "/orderinvoice/").concat(orderid));
    }
  }, {
    key: "createEtfBuyOrder",
    value: function createEtfBuyOrder(customerId, order) {
      return post(this._client, "/customers/".concat(customerId, "/etforders/buy"), order);
    }
  }, {
    key: "createEtfSIPBuyOrder",
    value: function createEtfSIPBuyOrder(customerId, order) {
      return post(this._client, "/customers/".concat(customerId, "/etforders/sipbuy"), order);
    }
  }, {
    key: "addPaymentDetailsForETforders",
    value: function addPaymentDetailsForETforders(payments) {
      return post(this._client, "/etforders/addPaymentDetails", payments);
    }
  }, {
    key: "taxRates",
    value: function taxRates(customerId, queryParams) {
      var additionalParametrs = {
        queryParams: queryParams
      };
      return get(this._client, "/customers/".concat(customerId, "/taxrates"), additionalParametrs);
    }
  }, {
    key: "taxRatesBranch",
    value: function taxRatesBranch(extBranchId, queryParams) {
      var additionalParametrs = {
        queryParams: queryParams
      };
      return get(this._client, "/branches/".concat(extBranchId, "/taxrates"), additionalParametrs);
    }
  }, {
    key: "loaninquire",
    value: function loaninquire(customerId, queryParams) {
      var additionalParametrs = {
        queryParams: queryParams
      };
      return get(this._client, "/customers/".concat(customerId, "/loaninquiry"), additionalParametrs);
    }
  }, {
    key: "loanrequest",
    value: function loanrequest(data) {
      return post(this._client, "/loans", data);
    }
  }, {
    key: "loandetails",
    value: function loandetails(loanid) {
      return get(this._client, "/loans/".concat(loanid));
    }
  }, {
    key: "addconsentdetails",
    value: function addconsentdetails(loanid, data) {
      return post(this._client, "/loans/".concat(loanid, "/addconsentdetails"), data);
    }
  }, {
    key: "createEtfSellOrder",
    value: function createEtfSellOrder(customerId, order) {
      return post(this._client, "/customers/".concat(customerId, "/etforders/sell"), order);
    }
  }, {
    key: "cancelEtfOrder",
    value: function cancelEtfOrder(customerId, orderId, cancellationReason) {
      return post(this._client, "/customers/".concat(customerId, "/etforders/cancel"), {
        id: orderId,
        cancellationreason: cancellationReason
      });
    }
  }, {
    key: "getEtfOrder",
    value: function getEtfOrder(customerId, orderId) {
      return get(this._client, "/customers/".concat(customerId, "/etforders/").concat(orderId));
    }
  }, {
    key: "pincode",
    value: function pincode(_pincode) {
      return get(this._client, "/pincode/".concat(_pincode));
    }
  }, {
    key: "getEtfOrderList",
    value: function getEtfOrderList(customerId, orderId) {
      return get(this._client, "/customers/".concat(customerId, "/etforders"));
    }
  }, {
    key: "bookBullionRate",
    value: function bookBullionRate(extCustomerId, bullionName, bullionId, rateType) {
      var additionalParametrs = {
        queryParams: {
          bullionName: bullionName,
          bullionId: bullionId,
          rateType: rateType
        }
      };
      return get(this._client, "/customers/".concat(extCustomerId, "/bullionrates"), additionalParametrs);
    }
  }, {
    key: "bookBullionRateBranch",
    value: function bookBullionRateBranch(extBranchId, bullionName, bullionId, rateType) {
      var additionalParametrs = {
        queryParams: {
          bullionName: bullionName,
          bullionId: bullionId,
          rateType: rateType
        }
      };
      return get(this._client, "/branches/".concat(extBranchId, "/bullionrates"), additionalParametrs);
    }
  }, {
    key: "getBullions",
    value: function getBullions(extCustomerId) {
      return get(this._client, "/customers/".concat(extCustomerId, "/bullions"));
    }
  }, {
    key: "getBullionsBranch",
    value: function getBullionsBranch(extBranchId) {
      return get(this._client, "/branches/".concat(extBranchId, "/bullions"));
    }
  }, {
    key: "getPassbook",
    value: function getPassbook(extCustomerId) {
      return get(this._client, "/customers/".concat(extCustomerId, "/passbook"));
    }
  }, {
    key: "createBuyOrder",
    value: function createBuyOrder(extCustomerId, order) {
      return post(this._client, "/customers/".concat(extCustomerId, "/buyorders"), order);
    }
  }, {
    key: "getBuyOrder",
    value: function getBuyOrder(extCustomerId, orderId) {
      return get(this._client, "/customers/".concat(extCustomerId, "/buyorders/").concat(orderId));
    }
  }, {
    key: "getBuyOrders",
    value: function getBuyOrders(extCustomerId) {
      return get(this._client, "/customers/".concat(extCustomerId, "/buyorders"));
    }
  }, {
    key: "createSellOrder",
    value: function createSellOrder(extCustomerId, order) {
      return post(this._client, "/customers/".concat(extCustomerId, "/sellorders"), order);
    }
  }, {
    key: "getSellOrder",
    value: function getSellOrder(extCustomerId, orderId) {
      return get(this._client, "/customers/".concat(extCustomerId, "/sellorders/").concat(orderId));
    }
  }, {
    key: "getSellOrders",
    value: function getSellOrders(extCustomerId) {
      return get(this._client, "/customers/".concat(extCustomerId, "/sellorders"));
    }
  }, {
    key: "createCoinOrder",
    value: function createCoinOrder(extCustomerId, order) {
      return post(this._client, "/customers/".concat(extCustomerId, "/coinorders"), order);
    }
  }, {
    key: "createJewelerOrder",
    value: function createJewelerOrder(extCustomerId, order) {
      return post(this._client, "/customers/".concat(extCustomerId, "/jewelerorders"), order);
    }
  }, {
    key: "cancelOrder",
    value: function cancelOrder(extCustomerid, orderId, cancellationReason) {
      return post(this._client, "/customers/".concat(extCustomerid, "/cancelorder"), {
        id: orderId,
        cancellationreason: cancellationReason
      });
    }
  }, {
    key: "getAgents",
    value: function getAgents() {
      return get(this._client, '/agents');
    }
  }, {
    key: "getAgent",
    value: function getAgent(extAgentId) {
      return get(this._client, "/agents/".concat(extAgentId));
    }
  }, {
    key: "saveAgents",
    value: function saveAgents(agents) {
      return post(this._client, "/agents", agents);
    }
  }, {
    key: "updateAgent",
    value: function updateAgent(extAgentId, agent) {
      return put(this._client, "/agents/".concat(extAgentId), agent);
    }
  }, {
    key: "getBranches",
    value: function getBranches() {
      return get(this._client, '/branches');
    }
  }, {
    key: "getBranch",
    value: function getBranch(extBranchId) {
      return get(this._client, "/branches/".concat(extBranchId));
    }
  }, {
    key: "saveBranches",
    value: function saveBranches(branches) {
      return post(this._client, "/branches", branches);
    }
  }, {
    key: "updateBranch",
    value: function updateBranch(extBranchId, branch) {
      return put(this._client, "/branches/".concat(extBranchId), branch);
    }
  }, {
    key: "getCustomers",
    value: function getCustomers(queryStringParameters) {
      var additionalParametrs = {
        queryParams: queryStringParameters
      };
      return get(this._client, "/customers", additionalParametrs);
    }
  }, {
    key: "getCustomer",
    value: function getCustomer(extCustomerId) {
      return get(this._client, "/customers/".concat(extCustomerId));
    }
  }, {
    key: "saveCustomers",
    value: function saveCustomers(customers) {
      return post(this._client, "/customers", customers);
    }
  }, {
    key: "updateCustomer",
    value: function updateCustomer(extCustomerId, customer) {
      return post(this._client, "/customers/".concat(extCustomerId), customer);
    }
  }, {
    key: "requestOtp",
    value: function requestOtp(phoneNumber) {
      return post(this._client, "/customers/requestotp", {
        'phoneNumber': phoneNumber
      });
    }
  }, {
    key: "login",
    value: function login(session) {
      return post(this._client, "/customers/login", session);
    }
  }, {
    key: "updateCustomer",
    value: function updateCustomer(extCustomerId, customer) {
      return put(this._client, "/customers/".concat(extCustomerId), customer);
    }
  }, {
    key: "getGatewayConfig",
    value: function getGatewayConfig(customerId) {
      return post(this._client, "/payments/".concat(customerId, "/gatewayconfig"), {
        test: 'dummy'
      });
    }
  }, {
    key: "getProduct",
    value: function getProduct(id) {
      return get(this._client, "/products/".concat(id));
    }
  }, {
    key: "getProductShowcase",
    value: function getProductShowcase(queryStringParameters) {
      var additionalParametrs = {
        queryParams: queryStringParameters
      };
      return get(this._client, "/productshowcase", additionalParametrs);
    }
  }, {
    key: "getProducts",
    value: function getProducts(queryStringParameters) {
      var additionalParametrs = {
        queryParams: queryStringParameters
      };
      return get(this._client, "/products", additionalParametrs);
    }
  }, {
    key: "testWebhook",
    value: function testWebhook(data) {
      return post(this._client, "/webhooks/dummy", data);
    }
  }, {
    key: "getCustomerDocumentUploadURL",
    value: function getCustomerDocumentUploadURL(extCustomerId, fileMetadata) {
      return post(this._client, "/customers/".concat(extCustomerId, "/uploaddoc"), fileMetadata);
    }
  }, {
    key: "getCustomerDocumentUploadURLForConsent",
    value: function getCustomerDocumentUploadURLForConsent(extCustomerId, fileMetadata) {
      return post(this._client, "/customers/".concat(extCustomerId, "/uploadconsentdoc"), fileMetadata);
    }
  }, {
    key: "getCustomerFileBasedOnFilePath",
    value: function getCustomerFileBasedOnFilePath(filePath) {
      return get(this._client, "".concat(filePath));
    }
  }, {
    key: "getCustomerSips",
    value: function getCustomerSips(extCustomerId) {
      return get(this._client, "/customers/".concat(extCustomerId, "/sips"));
    }
  }, {
    key: "cancelCustomerSip",
    value: function cancelCustomerSip(extCustomerId, sipId) {
      return _delete(this._client, "/customers/".concat(extCustomerId, "/sips/").concat(sipId));
    }
  }, {
    key: "createCustomerSip",
    value: function createCustomerSip(extCustomerId, sip) {
      return post(this._client, "/customers/".concat(extCustomerId, "/sips"), sip);
    }
  }, {
    key: "payCustomerSipInstallment",
    value: function payCustomerSipInstallment(extCustomerId, sipOrder) {
      return post(this._client, "/customers/".concat(extCustomerId, "/siporders"), sipOrder);
    }
  }, {
    key: "updateCustomerSip",
    value: function updateCustomerSip(extCustomerId, sipId, sipOrder) {
      return put(this._client, "/customers/".concat(extCustomerId, "/sips/").concat(sipId), sipOrder);
    }
  }, {
    key: "getCustomerSipDetails",
    value: function getCustomerSipDetails(extCustomerId, sipId) {
      return get(this._client, "/customers/".concat(extCustomerId, "/sips/").concat(sipId));
    }
  }, {
    key: "getOrdersMfiWise",
    value: function getOrdersMfiWise(queryParams) {
      var additionalParametrs = {
        queryParams: queryParams
      };
      return get(this._client, "/orders", additionalParametrs);
    }
  }, {
    key: "getInvoice",
    value: function getInvoice(extCustomerId, orderid) {
      return get(this._client, "/customers/".concat(extCustomerId, "/orderinvoice/").concat(orderid));
    }
  }, {
    key: "addKycDetails",
    value: function addKycDetails(data, loanId) {
      return post(this._client, "/loans/".concat(loanId, "/addkycdetails"), data);
    }
  }, {
    key: "verifyBankDetails",
    value: function verifyBankDetails(data) {
      return post(this._client, "/verification/cstmrbankdetails", data);
    }
  }]);

  return Client;
}();

exports.Client = function _callee(config) {
  return regeneratorRuntime.async(function _callee$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          return _context6.abrupt("return", new Client(config));

        case 1:
        case "end":
          return _context6.stop();
      }
    }
  });
};