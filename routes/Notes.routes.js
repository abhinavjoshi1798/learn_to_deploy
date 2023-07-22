const express = require("express");
const noteRouter = express.Router();
const { NoteModel } = require("../model/Note.model");

noteRouter.post("/create", async (req, res) => {
  try {
    const note = new NoteModel(req.body);
    await note.save();
    res.status(200).send({ msg: "New Note has been added" });
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

noteRouter.get("/", async (req, res) => {
  try {
    const notes = await NoteModel.find({authorID:req.body.authorID});
    res.status(200).send(notes);
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

noteRouter.patch("/update/:noteID", async (req, res) => {
  const { noteID } = req.params;
  const note = await NoteModel.findOne({_id:noteID})
  try {
    if(req.body.authorID !== note.authorID){
      res.status(200).send({"msg":"You are not authorized to do this action"})
    }else{
      await NoteModel.findByIdAndUpdate({ _id: noteID }, req.body);
      res.status(200).send({ "msg": `The note with id:${noteID} has been updated` });
    }
    
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

noteRouter.delete("/delete/:noteID", async (req, res) => {
    const { noteID } = req.params;
    const note = await NoteModel.findOne({_id:noteID})
    try {
      if(req.body.authorID !== note.authorID){
        res.status(200).send({"msg":"You are not authorized to do this action"})
      }else{
        await NoteModel.findByIdAndDelete({ _id: noteID });
        res.status(200).send({ "msg": `The note with id:${noteID} has been deleted` });
      }
        
      } catch (err) {
        res.status(400).send({ err: err.message });
      }
});

module.exports = {
  noteRouter,
};


// 64b9b66742251c8d4fc12fc6 Created By Silencer