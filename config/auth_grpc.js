const jwt = require('jsonwebtoken')
const config = require('./setup')

module.exports.generateToken = (payload) => {
    return jwt.sign(payload, config.secret, {expiresIn: 86400})
}

module.exports.verify = (token, callback) => {
    jwt.verify(token, config.secret, (err, user) => {
        if(err){
            console.error(err)
        }
        callback(user)
    })
}
