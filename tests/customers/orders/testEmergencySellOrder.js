const authenticatiion = require('../../../auth/authenticate.js');
const async = require('async');
const bookbullionrate = require('./bookbullionrate');
var testSellOrder = function () {
    const extCustomerId = "DVMFIBR001CST001";
    const bullion = {
        id : "G1",
        bullionShortName : "GD24K - 999",
        bullionName : "Gold",
        purity : {
            displayValue : "24Kt - (99.9%)",
            value : "999"
        },
        status : "available"
    }
    
    authenticatiion.authenticateClient(function (err, client) {
        if (client) {
            async.waterfall([
                function(next){
                    bookbullionrate.bookBullionRate(
                                                client,
                                                extCustomerId,
                                                bullion.name,
                                                bullion.id,
                                                "emergencySell",
                                                next);
                },
                function(bullionRate,next){                    
                    const aBookedRate = bullionRate[0];
                    if(aBookedRate){
                        console.dir(aBookedRate);
                        const _order = {
                            agent:{extAgentId:'EXTAGT007',name:{first:"Koshi",middle:"Venkateshwara",last:"Shaikh"}}, //An Agent that is not known to MyGold.
                            bullion:bullion, //need a valid bullion id
                            bullionRateId:aBookedRate.id, //bullion rateid got through rate booking.
                            weightInGm:1,
                            rateInrPerGm:4800,
                            //orderTotalValueInr:4800,  //can be 0 to skip an installment.      
                            sellType:"Emergency",                     
                        }
                        _order.taxRates = aBookedRate.taxRates;
                        next(null,_order);                        
                        
                    }
                    else{
                        next("Unable to book a bullion rate for this txn");
                    }
                },
                function(sipOrder,next){
                    createSellOrder(client,extCustomerId,sipOrder,next);
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

var createSellOrder = function (client,extCustomerId,order,callback) {
    
    client
        .invokeApi(null, `/customers/${extCustomerId}/sellorders`,
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

testSellOrder();