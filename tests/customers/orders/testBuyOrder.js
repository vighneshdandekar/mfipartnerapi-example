let STAGE = process.env.mygold_stage ? process.env.mygold_stage : 'dev';
const config = require('../../../config/credentials.json')[STAGE];
const DvaraGold = require('../../../cliient/dvaragold');
const async = require('async');
const bookbullionrate = require('./bookbullionrate');
var testPaySipInstallment = async function () {
    const extCustomerId = "1602025234183001";
    const bullion = {
        "id" : "G3",
        "bullionShortName" : "G24K",
        "bullionName" : "Gold",
        "purity" : {
            "displayValue" : "24Kt (99.9%)",
            "value" : "999"
        },
        "status" : "available"
    }
    let client = DvaraGold.Client(config)
    authenticatiion.authenticateClient(function (err, client) {
        if (client) {
            async.waterfall([
                function(next){
                    bookbullionrate.bookBullionRate(
                                                client,
                                                extCustomerId,
                                                bullion.bullionName,
                                                bullion.id,
                                                "buy",
                                                next);
                },
                function(bullionRate,next){
                    console.dir(bullionRate);
                    const aBookedRate = bullionRate[0];
                    if(aBookedRate){
                        const _order = {
                            agent:{extAgentId:'EXTAGT007',name:{first:"Koshi",middle:"Venkateshwara",last:"Shaikh"}}, //An Agent that is not known to MyGold.
                            bullion:bullion,
                            bullionRateId:aBookedRate.id, //bullion rateid got through rate booking.
                            weightInGm:10,
                            rateInrPerGm:2751,
                            //orderTotalValueInr:1000,
                            buyType:'FixedWeight',
                            test:"1234",
                            taxRates:aBookedRate.taxRates
                        }
                        next(null,_order);                        
                        
                    }
                    else{
                        next("Unable to book a bullion rate for this txn");
                    }
                },
                function(sipOrder,next){
                    createBuyOrder(client,extCustomerId,sipOrder,next);
                }
            ],function(err,result){
                if(err){
                    console.error(err)
                }
                else{
                    console.dir(result);
                }
            })
            //sendPaySipInsyallment(client, callback);
        }
        else {
            console.error(err);
        }
    })
}

var createBuyOrder = function (client,extCustomerId,order,callback) {
    
    client
        .invokeApi(null, `/customers/${extCustomerId}/buyorders`,
            'POST', {},
            order
        )
        .then(function (result) {
            callback(null,result.data)
        })
        .catch(function (result) {
            if (result.response) {
                callback({
                    status: result.response.status,
                    statusText: result.response.statusText,
                    data: result.response.data
                });
            } else {
                callback(result.message);
            }
        });
}

testPaySipInstallment();