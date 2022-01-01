let express = require('express')
let bodyParser = require('body-parser')
let mongoose = require('mongoose')
const mongoClient = require('mongodb')


// harus urut
let app = express()
let apiRoute = require('./api-routes')

// konfigurasi bodyParser untuk menangani request
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json())

// set koneksi
mongoose.connect('mongodb://localhost/datacomment',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

var port = process.env.PORT || 8080

app.get('/', function(req, res) {
     res.send('Hallo index')
})

app.use('/api', apiRoute)
app.listen(port, function(){
    console.log("Running on port " + port)
})