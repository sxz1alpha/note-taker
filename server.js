const fs = require('fs');
const express = require('express');
const notes = require(`./Develop/db/db.json`);
const { query } = require('express');
//instantiates the server 
const app = express();
const PORT = 3001;

function filterByQuery(query, notes) {
    let filteredResults = notesArray;
    if (query.diet) {
        filteredResults = filteredResults.filter(notes => notes.title === query.title);
    }
    if (query.date) {
        filteredResults = filteredResults.filter(notes => notes.date === query.date);
    }
    if (query.id) {
        filteredResults = filteredResults.filter(notes => notes.id === query.id);
    }
    return filteredResults;
};

app.get('/api/notes', (req, res) => {
    let results = notes;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    //use this code structore for all the get routes.
    // let parsNotes = JSON.parse(fs.readFileSync(`./Develop/db/db.json`, 'utf-8'));
    res.json(results);
});


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`)
});