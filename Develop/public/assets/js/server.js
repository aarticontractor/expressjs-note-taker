const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3002;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HTML Routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../notes.html'));
});

// API Routes for added notes page
app.get('/api/notes', (req, res) => {
    console.log("I am here");
    const db_file = path.join(__dirname, '../../../db/db.json')
    const notes = JSON.parse(fs.readFileSync(db_file, 'utf8'));
    res.json(notes);
  });
  
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    console.log("Body is: "+newNote);
    newNote.id = uuidv4();
    const db_file = path.join(__dirname, '../../../db/db.json')
    const notes = JSON.parse(fs.readFileSync(db_file, 'utf8'));
    console.log("Notes is" +notes);
    notes.push(newNote);
    console.log("New Note pushed is" +notes);
    fs.writeFileSync(db_file, JSON.stringify(notes));
    res.json(newNote);
  });

// Add HTML Wildcard route at the end
  app.get('*', (req, res) => {
      
    res.sendFile(path.join(__dirname, '../../index.html'));
  });
  
// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

