const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const notesData = path.join(__dirname, '../../db/db.json');

router.get('/', (req, res) => {
  fs.readFile(notesData, 'utf8', (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    res.json(notes);
  });
});

router.post('/', (req, res) => {
  const newNote = { ...req.body, id: uuidv4() };

  fs.readFile(notesData, 'utf8', (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    notes.push(newNote);

    fs.writeFile(notesData, JSON.stringify(notes, null, 2), (err) => {
      if (err) throw err;
      res.json(newNote);
    });
  });
});

router.delete('/:id', (req, res) => {
  const noteId = req.params.id;

  fs.readFile(notesData, 'utf8', (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    const updatedNotes = notes.filter(note => note.id !== noteId);

    fs.writeFile(notesData, JSON.stringify(updatedNotes, null, 2), (err) => {
      if (err) throw err;
      res.json({ message: 'Note deleted' });
    });
  });
});

module.exports = router;