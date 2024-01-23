const mongoose=require('mongoose')
const Document=require('./models/Documents')

mongoose.set('strictQuery', true);


mongoose.connect("mongodb://127.0.0.1:27017/realTimeEditor")
.then(console.log('Connected to Mongo Succesfully!'))
.catch(error=>console.log(error));

const io = require("socket.io")(3001, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  })
io.on("connection",socket=>{
    socket.on('get-document',async(documentId)=>{
        const docs=await findOrCreateDocument(documentId);
        socket.join(documentId)
        socket.emit('load-document',docs.data)
        socket.on("send-changes",(delta)=>{
           socket.broadcast.to(documentId).emit("receive-changes",delta)
        })
        socket.on("save-document",async(data)=>{
          await Document.findOneAndUpdate({doc_id:documentId},{data});
        })
    }) 
    
})

async function findOrCreateDocument(id){
    if(id==null) return;
    const document=await Document.findOne({doc_id:id});
    if(document) return document;
    return await Document.create({doc_id:id,data:""})
}