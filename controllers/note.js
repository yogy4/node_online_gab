Note = require('../models/note')
// User = require('../models/user')
// VerifyToken = require('../config/auth')

exports.index = function(req, res){
    Note.get(function (err, notes){
        if(err){
            res.json({
                status: "error",
                message: err
            })
        }
        res.json({
            status: "success",
            data: notes
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
        
        var note = new Note()
        note.title = req.body.title 
        note.note = req.body.note
        note.save(function (err){
            if(err){
                res.json(err)
            }
            res.status(200).send({message: "input", data: note})
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
    Note.findById(req.params.note_id, function(err, note){
        if(err){
            res.send(err)
        }
        res.json({
            message: 'still loading',
            data: note
        })
    })
}

exports.update = function(req, res){
    Note.findById(req.params.note_id, function(err, note){
        if(err){
            res.send(err)
        }
        note.title = req.body.title ? req.body.title : note.title
        note.note = req.body.note
        note.save(function (err){
            if(err){
                res.json(err)
            }
            res.json({
                message: 'comment has updated',
                data: note
            })
        })
    })
}

exports.delete = function(req, res){
    Note.remove = ({
        _id: req.params.note_id

    }, function(err, note){
        if(err){
            res.send(err)
        }
        res.json({
            message: "comment was deleted",
            status: "success"
        })
    })
}