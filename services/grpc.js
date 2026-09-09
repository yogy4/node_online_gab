const grpc = require('@grpc/grpc-js');
const { MongoClient } = require("mongodb");
const services_user = require('../proto/user_grpc_pb');
const services_comment = require('../proto/comment_grpc_pb');
const API_User = require("./api_user");
const API_Comment = require('./api_comment');

// Mongo Connection
const dbClient = new MongoClient("mongodb://localhost:27017/", { useUnifiedTopology: true });
let api = null;
let comment = null;

async function connectDB() {
    try {
        await dbClient.connect();
        let db = await dbClient.db("Microservice-demo-user");
        db.command({ ping: 1 });
        console.log("Connected successfully to mongo server");
        // Create index
        await db.collection("users").createIndex({ email: 1 });

        // Init api
        api = new API_User(db, grpc);
        comment = new API_Comment(db, grpc)

    } catch (e) {
        console.error(e);
    }
}

async function main() {
    await connectDB().catch(console.dir);
    let server = new grpc.Server();
    server.addService(services_user.UserSvcService, {
        register: api.register,
        login: api.login,
        verify: api.verify,
        getUser: api.getUser,
    });
    server.addService(services_comment.CommentSvcService, {
        post: comment.post,
        list: comment.list,
        readPaging: comment.readPaging,
        searching: comment.searching,
    })
    // let address = process.env.HOST + ":" + process.env.PORT;
    let address = "0.0.0.0:50055"
    server.bindAsync(address, grpc.ServerCredentials.createInsecure(), () => {
        server.start();
        console.log("Server running at " + address);
    });
}

main();