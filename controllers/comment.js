Comment = require('../models/comment')
User = require('../models/user')
VerifyToken = require('../config/auth')

exports.index = function(req, res){
    Comment.get(function (err, comments){
        if(err){
            res.json({
                status: "error",
                message: err
            })
        }
        res.json({
            status: "success",
            data: comments
        })
    })
}

exports.new = function(req, res, next){
    // User.findById(req.userId, {password: 0}, function (err, user){
    //     if(err){
    //         return res.status(500).send("there was a problem finding a user")
    //     }
    //     if(!user){
    //         return res.status(404).send("no user found")
    //     } 
        // else{
        // var tk = VerifyToken
        
        var comment = new Comment()
        comment.nama = req.body.nama 
        comment.komentar = req.body.komentar
        comment.save(function (err){
            if(err){
                res.json(err)
            }
            res.status(200).send({message: "input", data: comment})
            // ({
            //     message: "comment was input",
            //     data: comment

            // })
        // })
    // }

    })
        

    // var comment = new Comment()
    // comment.nama = req.body.nama ? req.body.nama : comment.nama
    // comment.komentar = req.body.komentar
    // comment.save(function (err){
    //     if(err){
    //         res.json(err)
    //     }
    //     res.json({
    //         message: "Comment was input",
    //         data: comment
    //     })
    // })
}

exports.view = function(req, res){
    Comment.findById(req.params.comment_id, function(err, comment){
        if(err){
            res.send(err)
        }
        res.json({
            message: 'still loading',
            data: comment
        })
    })
}

exports.update = function(req, res){
    Comment.findById(req.params.comment_id, function(err, comment){
        if(err){
            res.send(err)
        }
        comment.nama = req.body.nama ? req.body.nama : comment.nama
        comment.komentar = req.body.komentar
        comment.save(function (err){
            if(err){
                res.json(err)
            }
            res.json({
                message: 'comment has update',
                data: comment
            })
        })
    })
}

exports.delete = function(req, res){
    Comment.remove = ({
        _id: req.params.comment_id

    }, function(err, comment){
        if(err){
            res.send(err)
        }
        res.json({
            message: "comment was deleted",
            status: "success"
        })
    })
}