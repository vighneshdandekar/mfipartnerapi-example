const _PORT = 5678;
const _API_PREFIX = 'api/v2/dg'
const fetch = require('node-fetch')
fetch(`http://localhost:${_PORT}/${_API_PREFIX}/test`)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err=>{
        console.error(err)
    })
    .finally(()=>{
        process.exit(0)
    })