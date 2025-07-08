const messages = require('../proto/comment_pb')

module.exports = class API_Comments {
    constructor(db, grpc){
        this.db = db;
        this.grpc = grpc;
    }

    post = (call, callback) => {
        const comments = this.db.collection("comments")
        let comm = {name: call.request.getName(), comment: call.request.getComment()}
        comments.insertOne(comm).then(r => {
            let resp = new messages.Comment();
            resp.setName(comm.name)
            resp.setComment(comm.comment)
            callback(null, resp)
        })
    }

    list = (_, callback) => {
        const comments = this.db.collection("comments")
        let resp = new messages.ListComment();
      
        comments.find({}).toArray(function(err, result){
            if(err) throw err
            result.forEach(element => {
                let comment = new messages.Comment()
                comment.setName(element.name)
                comment.setComment(element.comment)
                resp.addComments(comment)
            });
            callback(null, resp)
        })
       

    }
}