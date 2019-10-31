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
    for(var i = 0 ; i < 1; i++){
        var _id = shortid.generate();
        _customers.push(
            {
                name:{
                    first:`Vighnesh ${_id}`,
                    middle:'Trivia',
                    last:'Somtune'
                },
                extCustomerId:`VGNEW11234-00${i}`,
                dob:"1957-09-05",
                phone:{mobile:`992326993${i}`},
                idProof:[{
                    documentId:`ABC1234XV${i}`,
                    documentType: 'passport',
                    documentImage:{
                        id:'1234',
                        uri:'/customers/uploaded/ce65ad07-a0b1-452b-ba19-7cea4f149360'
                    },
                    issueDate: new Date(),
                    validUntil: new Date()
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
                branchId:'EXTB123412123',
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