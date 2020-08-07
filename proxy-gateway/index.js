const argv = require('yargs').argv
const assert = require('assert');
const fs = require('fs');
const credentials = argv.credentials;
const DvaraGold = require('partnerapi-example-nodejs')
assert(credentials && fs.existsSync(credentials), `Credentals JSON Path ${credentials} is invalid`)

const express = require("express");
const app = express();
const bodyParser = require('body-parser');

const _GLOBAL = {}
_GLOBAL.apiClient = null;

app.use(bodyParser.json());

const _api_prefix = argv.prefix ? argv.prefix : '/dgapi'

console.log(`Setting up REST handlers for ${_api_prefix}/*`)
app.use(`${_api_prefix}/*`, function (req, res) {
    invokeDGApi(req.method, req.baseUrl.replace(_api_prefix, ""), req.query, req.body)
        .then(response=>{
            if(true == response.status){
                res.json({data:response.result});
            }
            else{
                res.status(400).json({error:response.result})    
            }
        })
        .catch(e=>{
            res.status(500).send({error:e})
        })
})

const SUPPORTED_METHODS = ['GET', 'POST', 'DELETE', 'PUT']
let invokeDGApi =  async function (method, path, queryParams, data) {
    console.log(method, path, queryParams, data)
    const _method = `${method.toUpperCase()}`
    assert(SUPPORTED_METHODS.indexOf(_method) != -1, "Unspported API Call");
    if(_GLOBAL.apiClient) {            
        try{
            let _call = null;            
            switch(_method){
                case 'GET':{
                    _call = _GLOBAL.apiClient._GET(path, queryParams)
                    break;
                }
                case 'POST':{
                    _call = _GLOBAL.apiClient._POST(path, data)
                    break;
                }
                case 'DELETE':{
                    _call = _GLOBAL.apiClient._DELETE(path, data)
                    break;
                }
                case 'PUT':{
                    _call = _GLOBAL.apiClient._PUT(path, data)
                    break;
                }
            } 
            return {status: true, result: await _call};   
        }
        catch(e){
            return {status: false, error: e};   
        }
    }
    else{
        return {status:false, error: new Error("API Client not ready")}
    }
}



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    console.log(req.url)
    var err = new Error('The requested resource not found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'dev' ? err : {};
    // render the error message
    res.status(err.status || 500).json({ code: err.status || 500,  error : err.message });
});

DvaraGold.Client( JSON.parse(fs.readFileSync(credentials)))
.then(client=>{
    _GLOBAL.apiClient = client; 
    var server = app.listen(argv.port || 8091, () => {    
        var host = server.address().address
        var port = server.address().port
        console.log(`Dvara Gold API Proxy listening at http://127.0.0.1:${port}`);
    });
    
})
.catch(e=>{
    console.error(e);
})
