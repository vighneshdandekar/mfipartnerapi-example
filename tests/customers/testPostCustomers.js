const authenticatiion = require('../../auth/authenticate.js');
const shortid = require('shortid')

var testPostCustomers = function () {
    authenticatiion.authenticateClient(function (err, client) {
        if (client) {
            function callback(error, response, body) {
                if (!error && response.statusCode == 200) {
                    var info = JSON.parse(body);
                    console.log(info);

                }
            }
            saveCustomers(client, callback);
        }
        else {
            console.error(err);
        }
    })
}

var saveCustomers = function (client, callback) {
    var _id = shortid.generate();
    const _customers = [
        {
            name:{
                first:'Henry',
                middle:'Danger',
                last:'Dillinger'
            },
            extCustomerId:'HG1234',
            dob:"1957-01-05",
            phone:{mobile:'1223699356'},
            idProof:[{
                documentId:"ABC1234XV",
                documentType: 'passport'
            }],
            address:{
                houseNumber:"1",streetName:"2",district:"Tvm",pinCode:695101,state:"Kerala",country:"India",stdCode:0470
            },
            fatherName:{
                first:"Galvanized",
                last:"Vulcan"
            },
            centerName:"Center",
            maritalStatus:"married",
            localLanguage:"marathi",
            branchId:'EX0567',
            gender:'m'
        }
]
    client
        .invokeApi(null, '/customers', 'POST', {}, _customers)
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
}

testPostCustomers();