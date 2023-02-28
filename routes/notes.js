const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const nodemon = require("nodemon");

//---------------------------------------------Fetching all notes for user-------------------------------------------------//
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some error occured");
  }
});

//-----------------------------------------------------Adding new note-----------------------------------------------------//

router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be a bit longer").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    const { title, description, tag } = req.body;
    if (!errors.isEmpty) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //creating new note in db collection
      const note = new Notes({ title, description, tag, user: req.user.id });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
);

router.put("/updatenote/:id", fetchUser, async (req, res) => {
  let { title, description, tag } = req.body;

  try {
    // checking and fetching note from db
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note not found");
    }

    // checking if the note in question belongs to the user or not
    if (note.user.toString() !== req.user.id)
      return res.send("Permission denied");

    //Settings the values to be updated
    if (title) note.title = title;
    if (description) note.description = description;
    if (tag) note.tag = tag;
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: note },
      { new: true }
    );
    // res.json(note);
    res.send(note);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//------------------------------------------------------ Deleting a note ----------------------------------------/
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  try {
    // checking and fetching note from db
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note not found");
    }
    // checking if the note in question belongs to the user or not
    if (note.user.toString() !== req.user.id)
      return res.send("Permission denied");

    note = await Notes.findByIdAndDelete(req.params.id);
    res.send("Success");
  } catch (error) {
    res.status(500).json(error.message);
  }
});
module.exports = router;
