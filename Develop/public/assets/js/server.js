const express = require('express');
const path = require('path');

const app = express();
const PORT = 3002;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// HTML Routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../notes.html'));
});

app.get('*', (req, res) => {
    
  res.sendFile(path.join(__dirname, '../../index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

