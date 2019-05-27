var mongoose = require('mongoose')

var skema = mongoose.Schema({
    nama: {
        type: String,
        require: true
    },
    komentar: String,
    tanggal: {
        type: Date,
        default: Date.now
    }
})

var comment = module.exports = mongoose.model('comment', skema)
module.exports.get = function (callback, limit){
    comment.find(callback).limit(limit)
}