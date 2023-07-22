const mongoose = require("mongoose");
const noteSchema = mongoose.Schema({
    title:{type:String,required:true},
    body:{type:String,required:true},
    author:{type:String,required:true},
    authorID:{type:String, require:true},
    category:{type:String,required:true},
},{
    versionKey:false
})

const NoteModel = mongoose.model("note",noteSchema)

module.exports={
    NoteModel
}