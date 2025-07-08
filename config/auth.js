// var express = require('express')
// var router = express.Router()
// var bodyParser = require('body-parser')
// router.use(bodyParser.urlencoded({ extended: false}))
// router.use(bodyParser.json())
// var User = require('../models/user')
var jwt = require('jsonwebtoken')
// var bcypt = require('bcryptjs')
var config = require('./setup')
var redis = require('./token')
var User = require('../models/user')
function verifyToken(req, res, next){
    var token = req.headers['x-access-token']
    // var token = req.body['x-access-token']
    // var token_redis = redis.get_token(token)
    // console.log(token_redis)
    if(!token){
    // if(!token_redis){
        return res.status(403).send({auth: false, message: 'no token provided'})
    }
    jwt.verify(token, config.secret, function(err, decoded){
    // jwt.verify(token_redis, config.secret, function(err, decoded){
        // if(err){
        //     return res.status(500).send({auth: false, message: 'failed to authenticate token'})
        // }
        
        req.userId = decoded.id
        // console.log(req.userId) 
        next()
    })

    // var token_redis = redis.get_token(token).toString()
    // if(token_redis){
    //     return res.status(401).send({message: 'token already use'})
    // }
    // req.userId = token_redis
//    console.log(token_redis.length)
    // next()
   
}

function verifyTokenWithRedis(req, res, next){
    var token = req.headers['x-access-token']
   token_redis = redis.get_token(token)
   console.log(token_redis)

    if(!token_redis){
        console.log('token not verified')
        return res.status(403).send({auth: false, message:'no token provided'})
        // jwt.verify(token, config.secret, function(err, decoded){
        //     req.userId = decoded.id
        //     next()
        // })
    }
    jwt.verify(token_redis, config.secret, function(err, decoded){
        req.userId = decoded.id
        next()
    })
    // try{
        // token_redis = redis.get_key(token)
        // result = (token_redis === 0)
        // console.log(result)
        // if(token_redis != null){
            // console.log('token not verified')
            // return res.status(200).send({auth: true, message:'no token provided'})
            // next()
            
        // }
        // req.userId = token_redis
        // console.log(req.userId)
        // next()
        // return res.status(401).send({auth: false, message:'no token provided'})
        // return true
        // return token_redis


    // }catch(err){
        // console.log('error ' + err.message)
        // return res.status(500).send({error: err.message, message:'error while getting token'})
    // }
    // next()

}

// agar fungsi bisa dipanggil maka harus di export verifyToken: adalah yang akan di panggil di file lain sedang verifyToken adalah nama fungsi yang didefinisikan diatas
module.exports = {verifyToken: verifyToken, verifyTokenWithRedis: verifyTokenWithRedis}
