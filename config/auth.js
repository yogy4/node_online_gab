// var express = require('express')
// var router = express.Router()
// var bodyParser = require('body-parser')
// router.use(bodyParser.urlencoded({ extended: false}))
// router.use(bodyParser.json())
// var User = require('../models/user')
var jwt = require('jsonwebtoken')
// var bcypt = require('bcryptjs')
var config = require('./setup')

function verifyToken(req, res, next){
    // var token = req.headers['x-access-token']
    var token = req.body['x-access-token']
    if(!token){
        return res.status(403).send({auth: false, message: 'no token provided'})
    }
    jwt.verify(token, config.secret, function(err, decoded){
        if(err){
            return res.status(500).send({auth: false, message: 'failed to authenticate token'})
        }
        
        req.userId = decoded.id 
        next()
    })
}
// agar fungsi bisa dipanggil maka harus di export verifyToken: adalah yang akan di panggil di file lain sedang verifyToken adalah nama fungsi yang didefinisikan diatas
module.exports = {verifyToken: verifyToken}