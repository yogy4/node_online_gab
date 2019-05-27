let express = require('express')
let bodyParser = require('body-parser')
let mongoose = require('mongoose')



// harus urut
let app = express()
let apiRoute = require('./api-routes')

// konfigurasi bodyParser untuk menangani request
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json())

// set koneksi
mongoose.connect('mongodb://localhost/datacomment')
// buat koneksi ke mongodb
var db = mongoose.connection
var port = process.env.PORT || 8080

app.get('/', function(req, res) {
     res.send('Hallo index')
})

app.use('/api', apiRoute)
app.listen(port, function(){
    console.log("Running on port " + port)
})