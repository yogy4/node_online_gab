var User = require('../models/user')
var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')
var setup = require('../config/setup')
var redis = require('../config/token')
// const redis = require('redis')
// const redisctl = redis.createClient()

// import { createClient } from 'redis'
// const redisctl = createClient()
// redisctl.on('connect', function(){
//     console.log("redis connected")
// })
//  await redisctl.connect()


// redisctl.on('connect', () => console.log('redis connected'))
// redisctl.on('error', (err) => console.log('redis err', err))

exports.reg = function(req, res){
    var hashPass = bcrypt.hashSync(req.body.password, 8)
    var user = new User()
    user.name = req.body.name ? req.body.name : user.name
    user.email = req.body.email
    user.password = hashPass

    user.save(function (err, userk){
        if(err) {
            return res.status(500).send("There was a problem")
        }
        var token = jwt.sign({id: userk._id }, setup.secret, {
            expiresIn: 86400 //dalam 24 jam
        })
        // redis.token.set(token, userk._id)
        value = userk._id.toString()
        redis.set_token(token, value)
        
        res.status(200).send({auth: true, token: token})

    })
    
}

exports.login = function(req, res){
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            return res.status(500).send('Error on the server')
        }
        if(!user){
            return res.status(404).send('User not found')
        }
        var validPass = bcrypt.compareSync(req.body.password, user.password)
        if(!validPass){
            return res.status(401).send({auth: false, token: null})
        }
        var token = jwt.sign({id: user._id}, setup.secret, {
            expiresIn: 86400
        })
        // var userid = user._id
        // value = user._id.toString()
        redis.set_token(token, token)
        res.status(200).send({auth: true, token: token})
        // redisctl.set(userid, function(err, reply){
        //     console.log(reply)
        // })

    })
}

exports.logout = function(req, res){
    res.status(200).send({auth: false, token: null})
}