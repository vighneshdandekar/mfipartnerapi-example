exports.bookBullionRate = function( client,
                                    extCustomerId,
                                    bullionName,
                                    bullionId,
                                    rateType, 
                                    callback)
{
    const bullionParams = {
        bullionName:bullionName,
        bullionId:bullionId,
        rateType:rateType
    }
    getRate(client,extCustomerId,bullionParams,callback)        
}

var getRate = function (client,extCustomerId,bullionParams, callback) {
    const additionalParametrs = {
        queryParams:bullionParams
    }    
    client.invokeApi(null, `/customers/${extCustomerId}/bullionrates`, 'GET',additionalParametrs)
        .then(function (result) {
            callback(null,result.data);
        })
        .catch(function (result) {
            callback(result.message,null);
        });
}