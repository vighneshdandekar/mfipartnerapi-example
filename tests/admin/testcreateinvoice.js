process.env.mygold_stage='admin'
const authenticatiion = require('../../auth/authenticate.js');

var testGetAgents = function () {
    authenticatiion.authenticateClient(function (err, client) {
        if (client) {
            function callback(error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(JSON.stringify(body));
                }
            }
            getInvoice(client,'b04eaa70-ec13-11e9-bfb9-571f571fcbcd', callback);
        }
        else {
            console.error(err);
        }
    })
}
var getInvoice = function (client, orderid, callback) {
    client
        .invokeApi(null, `/pdfinvoice/customerorder/${orderid}`, 'GET')
        .then(function (result) {
            // let pdfdata = result.data;
            // let fs = require('fs');
            // let results = fs.writeFileSync('/tmp/outputfile.pdf',new Buffer(pdfdata,'base64'))
            // console.log('Output @ /tmp/outputfile.pdf ')
            console.log(result.data);
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
        })
        .finally(()=>{
            process.exit(0);
        })
        
}

testGetAgents();