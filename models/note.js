var mongoose = require('mongoose')

var schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    note: String
})
var note = module.exports = mongoose.model('note', schema)
module.exports.get = function (callback, limit){
    note.find(callback).limit(limit)
}