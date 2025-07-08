let express = require('express')
let bodyParser = require('body-parser')
let mongoose = require('mongoose')
const mongoClient = require('mongodb')
// harus urut
let app = express()
let apiRoute = require('./api-routes')
// var redis = require('./config/token')
// var redis = require('redis')
// var redis_client = redis.createClient()
// konfigurasi bodyParser untuk menangani request

// redis_client.on('connect', function(){
//     console.log('Redis connected')
// })
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json())

// set koneksi
mongoose.connect('mongodb://127.0.0.1/datacomment',
// for container
// mongoose.connect('mongodb://mongo:27017/datacomment',
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
