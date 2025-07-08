var multer = require('multer')
var util = require('util')
var storage = multer.diskStorage({
    destination: function (req, file, callback){
        callback(null, './uploads')
    },
    filename: function (req, file, callback){
        callback(null, file.fieldname + '-' + Date.now())
    }

})
var upload = multer({storage: storage}).single('userAvatar')
var uploadFileMiddleware = util.promisify(upload)
module.exports = uploadFileMiddleware 