const messages = require('../proto/comment_pb')
const {ObjectId} = require('mongodb')
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

    // readPaging = (call, callback) => {
    //     const pageSize = call.request.page_size || 2
    //     const pageToken = call.request.page_token

    //     // Build query for cursor pagination using _id
    //     const query = pageToken ? { _id: { $gt: new ObjectId(pageToken) } } : {}

    //     try {
    //         // Fetch one extra item to determine if a next page exists
    //         // const docs = await db.collection('comments')
    //         const docs = this.db.collection("comments").find(query).sort({ _id: 1 }).limit(pageSize + 1).toArray();

    //         let next_page_token = "";
    //         if (docs.length > pageSize) {
    //         docs.pop(); // Remove the extra item
    //         next_page_token = docs[docs.length - 1]._id.toString();
    //         }

    //         const comments = docs.map(doc => ({
    //         // id: doc._id.toString(),
    //         name: doc.name,
    //         comment: doc.comment
    //         }));

    //         callback(null, { comments, next_page_token });
    //     } catch (err) {
    //         callback({
    //         // code: grpc.status.INTERNAL,
    //         details: err.message,
    //         message: console.log("error message is ", err)
            
            
            
    //         });
    //     }
    // }

     readPaging = (call, callback) => {
        const pageSize = call.request.page_size || 2
        const pageToken = call.request.page_token
        // Build query for cursor pagination using _id
        // const query = pageToken ? { _id: { $gt: new ObjectId(pageToken) } } : {}
        const query = {};
        if (pageToken) {
            query._id = { $gt: new ObjectId(pageToken) };
        }


        
            // Fetch one extra item to determine if a next page exists
            // const docs = await db.collection('comments')
            const docs = this.db.collection("comments")
            let resp = new messages.ReadPagingResponse()
            let next_page_token = "";
            

            // const comments = docs.map(doc => ({
            // // id: doc._id.toString(),
            // name: doc.name,
            // comment: doc.comment
            // }));

            docs.find(query).sort({ _id: 1 }).limit(pageSize + 1).toArray(function (err, result){
                if(err) throw err
                result.forEach(element => {
                    if (result.length > pageSize) {
                        result.pop(); // Remove the extra item
                        next_page_token = result[result.length - 1]._id.toString();
                        // const nextComment = docs.pop()
                        // next_page_token = nextComment._id.toHexString()
                    }
                    let comment = new messages.Comment()
                    comment.setName(element.name)
                    comment.setComment(element.comment)
                    resp.addComments(comment)
                    resp.setNextPageToken(next_page_token)
                    // console.log("next page token is ", next_page_token)

                })
                callback(null, resp)

            });
            // console.log("length docs is", docs.length)

            // callback(null, { comments, next_page_token });
        
           
    }
    
    searching = (call, callback) => {
        const pageSize = call.request.page_size || 2
        const pageToken = call.request.page_token
        const name = call.request.getName()
        console.log("name  is", name)
        // Build query for cursor pagination using _id
        // const query = pageToken ? { _id: { $gt: new ObjectId(pageToken) } } : {}

        const query = {name: { $regex: name, $options: "i" } };
        // const query = call.request.name
        // Create a regex search query (case-insensitive)
        // const query = q ? { name: { $regex: q, $options: 'i' } } : {};
        // const query = q ? { name: { $regex: q} } : {};


        if (pageToken) {
            query._id = { $gt: new ObjectId(pageToken) };
        }


        
            // Fetch one extra item to determine if a next page exists
            // const docs = await db.collection('comments')
            const docs = this.db.collection("comments")
            let resp = new messages.SearchResponse()
            let next_page_token = "";
            

            // const comments = docs.map(doc => ({
            // // id: doc._id.toString(),
            // name: doc.name,
            // comment: doc.comment
            // }));

            docs.find(query).sort({ _id: 1 }).limit(pageSize + 1).toArray(function (err, result){
                if(err) throw err
                result.forEach(element => {
                    if (result.length > pageSize) {
                        result.pop(); // Remove the extra item
                        next_page_token = result[result.length - 1]._id.toString();
                        // const nextComment = docs.pop()
                        // next_page_token = nextComment._id.toHexString()
                    }
                    let comment = new messages.Comment()
                    comment.setName(element.name)
                    comment.setComment(element.comment)
                    resp.addComments(comment)
                    resp.setNextPageToken(next_page_token)
                    // console.log("next page token is ", next_page_token)

                })
                callback(null, resp)

            });
            // console.log("length docs is", docs.length)

            // callback(null, { comments, next_page_token });
        
           
    }


    
}

// =======
// const { ObjectId } = require('mongodb');

// async function listItems(call, callback) {
//   const pageSize = call.request.page_size || 10;
//   const pageToken = call.request.page_token;

//   // Build query for cursor pagination using _id
//   const query = pageToken ? { _id: { $gt: new ObjectId(pageToken) } } : {};

//   try {
//     // Fetch one extra item to determine if a next page exists
//     const docs = await db.collection('items')
//       .find(query)
//       .sort({ _id: 1 })
//       .limit(pageSize + 1)
//       .toArray();

//     let next_page_token = "";
//     if (docs.length > pageSize) {
//       docs.pop(); // Remove the extra item
//       next_page_token = docs[docs.length - 1]._id.toString();
//     }

//     const items = docs.map(doc => ({
//       id: doc._id.toString(),
//       name: doc.name
//     }));

//     callback(null, { items, next_page_token });
//   } catch (err) {
//     callback({
//       code: grpc.status.INTERNAL,
//       details: err.message
//     });
//   }
// }
