var User = require('../models/user')
var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')
var setup = require('../config/setup')

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
        res.status(200).send({auth: true, token: token})
    })
}

exports.logout = function(req, res){
    res.status(200).send({auth: false, token: null})
}