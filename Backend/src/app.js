/**
 * Server Create Krna
 * Server Config Krna
 */

const express = require("express");
const noteModel = require("./model/notes.model");
const cors = require("cors")
const path = require("path")

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('./public'))

// POST /api/notes
// create notes
app.post("/api/notes", async (req, res) => {
  const { title, description } = req.body;

  const note = await noteModel.create({
    title,
    description,
  });

  res.status(201).json({
    message: "note created successfully",
    note,
  });
});

// GET /api/notes
// Retrive The Notes Collection
app.get("/api/notes", async (req, res) => {
  const notes = await noteModel.find();

  res.status(200).json({
    message: "notes retrived",
    notes,
  });
});

// DELETE /api/notes/:id
// delete selected :id note
app.delete("/api/notes/:id", async (req, res) => {
  const id = req.params.id;

  await noteModel.findByIdAndDelete(id);

  res.status(200).json({
    message: "note deleted successfully",
  });
});

// PATCH /api/notes
// update notes data
app.patch("/api/notes/:id", async (req, res) => {
  const id = req.params.id;

  const { title, description } = req.body;

  await noteModel.findByIdAndUpdate(id, {description,title});

  res.status(200).json({
    message: 'note updated successfully',
  })
});

app.use('*name',(req,res)=>{
  res.sendFile(path.join(__dirname,"..","/public/index.html"))
})

module.exports = app;
