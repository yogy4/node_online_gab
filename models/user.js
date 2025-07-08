var mongoose = require('mongoose')
var skema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})
var user = module.exports = mongoose.model('user', skema)
module.exports.get = function (callback, limit){
    user.find(callback).limit(limit)
}