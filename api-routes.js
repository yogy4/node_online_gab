let router = require('express').Router()
router.get('/', function(req, res){
    res.json({
        status: 'success',
        message: 'welcome api',
    })
})

var Comment = require('./controllers/comment')
var User = require('./controllers/user')
let middle = require('./config/auth')

router.route('/comments')
    .get(Comment.index)
    .post(middle.verifyToken, Comment.new)
router.route('/comment/:comment_id')
    .get(Comment.view)
    .patch(middle.verifyToken, Comment.update)
    .put(middle.verifyToken, Comment.update)
    .delete(middle.verifyToken, Comment.delete)

router.route('/login')
    .post(User.login)

router.route('/registration')
    .post(User.reg)
    
router.route('/logout')
    .get(User.logout)
 module.exports = router