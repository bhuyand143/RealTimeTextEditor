const mongoose=require('mongoose')

const documentSchema=new mongoose.Schema({
    doc_id:String,
    data:Object
});

module.exports=mongoose.model('Document',documentSchema);