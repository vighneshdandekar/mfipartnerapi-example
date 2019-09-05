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
    const _customers = []
    for(var i = 0 ; i < 10; i++){
        var _id = shortid.generate();
        _customers.push(
            {
                name:{
                    first:`Barrack ${_id}`,
                    middle:'Trivia',
                    last:'Somtune'
                },
                extCustomerId:`BG1234567-00${i}`,
                dob:"1957-09-05",
                phone:{mobile:`992326993${i}`},
                idProof:[{
                    documentId:`ABC1234XV${i}`,
                    documentType: 'passport'
                }],
                address:{
                    houseNumber:"1",streetName:"2",district:"Tvm",pinCode:695101,state:"Kerala",country:"India",stdCode:0470
                },
                fatherName:{
                    first:"Groverty ",
                    last:`${_id}`
                },
                centerName:"Center",
                maritalStatus:"married",
                localLanguage:"Tamil",
                branchId:'27',
                gender:'m'
            }            
        )
    }

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
                console.error(result.message);
            }
        });
}

testPostCustomers();