const client = require("./client.js")

client.getAllNews({}, (error, news) => {
    console.log(error)
    console.log(news)
  });

  client.addNews({id: '5',title:"something", body:"something Else", postImage:"here it is."}, (error, news)=>{
      if(!error){
          console.log(news)
      }
  })

  client.deleteNews({id:'1'}, (err, reply)=>{
      if(!err){
          console.log(reply)
      }
  })

  client.editNews({id: '1', title: "something is changed", body:"Yeah! it is totally changed.", postImage:"something"}, (error, news)=>{
      if(!error){
        console.log(news)
    }
  })