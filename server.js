const grpc = require("@grpc/grpc-js");
const PROTO_PATH = "./news.proto";
var protoLoader = require("@grpc/proto-loader"); // source path of proto file

const options = {
    keepCase: true,
    longs: String,
    enums: String, 
    defaults: true,
    oneofs: true
} //option object for proto file

var packageDefination = protoLoader.loadSync(PROTO_PATH, options) //loading useing loadsync
const newsProto = grpc.loadPackageDefinition(packageDefination) // package defination loaded

var server = new grpc.Server();

let news = [
    { id: "1", title: "Learn Grpc right now", body:"Let's learn it now.", postImage: "Posted image 1"},
    { id: "2", title: "Nodejs is the future.", body:"Here's the to best language ever.", postImage:"posted Image 2"},
];

server.addService(newsProto.NewsService.service, {
    getAllNews: (_, callback)=>{
        callback(null, {news})
    },
    addNews: (call, callback) => {
        const _news = call.request
        news.push(_news)
        callback(null, _news)
    },
    deleteNews: (_, callback)=>{
        const newsId = _.request.id;
        news = news.filter(({id}) => id !== newsId);
        callback(null, {});
    },
    editNews: (_, callback)=>{
        const newsId = _.request.id;
        const newsBody = _.request.body;
        const newsTitle = _.request.title;


        objIndex = news.findIndex((object => object.id = newsId))
        console.log(news[objIndex])
        console.log(newsBody)
        if(objIndex > -1){
            news[objIndex].body = newsBody;
            news[objIndex].title = newsTitle;
        }
        callback(null, {})
    }
});

server.bindAsync(
    '127.0.0.1:3000',
    grpc.ServerCredentials.createInsecure(),
    (err, port)=>{
        if(err){
            console.log("not working")
            return;
        }

        console.log("Server running at http://127.0.0.1:50051");
        server.start();    
    
    },
    )
