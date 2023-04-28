// Import required packages
const express = require('express');
const path = require('path');
const fs = require('fs');
// downloaded npm package 'uuid'for generating random id's
const { v4: uuidv4 } = require('uuid');
const app = express();
// As the application is deployed on Heroku, it can work on Heroku's environment port, else use port 3000.
const PORT = process.env.PORT || 3000;

app.use(express.static('Develop/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HTML Routes to access the homepage
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../notes.html'));
});

// API Routes for added notes page (GET, POST, and DELETE)
app.get('/api/notes', (req, res) => {
    const db_file = path.join(__dirname, '../../../db/db.json');
    const notes = JSON.parse(fs.readFileSync(db_file, 'utf8'));
    res.json(notes);
  });
  
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    console.log("Body is: "+newNote);
    newNote.id = uuidv4();
    const db_file = path.join(__dirname, '../../../db/db.json');
    const notes = JSON.parse(fs.readFileSync(db_file, 'utf8'));
    console.log("Notes is" +notes);
    notes.push(newNote);
    console.log("New Note pushed is" +notes);
    fs.writeFileSync(db_file, JSON.stringify(notes));
    res.json(newNote);
  });

app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    console.log("NoteID To delete: " +noteId);
    const db_file = path.join(__dirname, '../../../db/db.json');
    const notes = JSON.parse(fs.readFileSync(db_file, 'utf8'));
    const updatedNotes = [];

// The for-loop will iterate through the notes length and check for the id that matches the deleted note and store it in 'notes' variable
    for (let i = 0; i < notes.length; i++) {
        const note = notes[i];
        if (note.id !== noteId) {
            updatedNotes.push(note);
        }
    }
// The deleted note will get stored in 'notes' and the remaining existing notes will be updated in 'updatedNotesJSON' variable.
    const updatedNotesJSON = JSON.stringify(updatedNotes);
    fs.writeFileSync(db_file, updatedNotesJSON);

    res.json({ success: true });
  });

// Add HTML Wildcard route at the end
  app.get('*', (req, res) => {
      
    res.sendFile(path.join(__dirname, '../../index.html'));
  });
  
// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

