const redis = require('redis')
const client = redis.createClient()

var prefix = "nodejs_"
client.on('connect', function(){
    console.log('Redis connected')
})

// client.on('error', err => console.log('redis client error', err))
// await client.connect()

exports.set_token = function(token, value){
    // var key = prefix + token
    client.set(token, value)
    // client.expire(key, 86400)
    client.expire(token, 600)
}

exports.get_token = function(token){
    // var key = prefix + token
    // client.get(key)
    client.get(token, function(err, reply){
        console.log(reply)
        return token
    })
}

exports.get_key = function(token){
    client.keys(token, function(err, reply){
        console.log(reply)
    })
}




// async function setoken(token, value){
//     var key = prefix + token
//     await client.set(key, value)
// }

// async function getoken(token){
//     var key = prefix + token
//     await client.get(key)
// }
// module.exports = {get_token_from_redis: getoken, save_token_in_redis: setoken}