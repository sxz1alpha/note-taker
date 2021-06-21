const fs = require('fs');
const path = require('path');
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { notes } = require(`./Develop/db/db.json`);

//instantiates the server 
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());




function filterByQuery(query, notes) {
    
    //TODO:CHANGE THE NOTES.ANIMALS TO THE NEW DATA FORMAT
    let filteredResults = notes.animals;
    
    if (query.date) {
        filteredResults = filteredResults.filter(notes => notes.date === query.date);
    }
    if (query.name) {
        filteredResults = filteredResults.filter(notes => notes.name === query.name);
    }
    if (query.id) {
        filteredResults = filteredResults.filter(notes => notes.id === query.id);
    }
    return filteredResults;
};

function createNewNote(body, notesArray) {
    const note = body
    notesArray.push(note)
    fs.writeFileSync(
        path.join(__dirname, './Develop/db/db.json'),
        JSON.stringify({notes: notesArray}, null, 2)
    );
    return note;
}

//retrieves data from a file
app.get('/api/notes', (req, res) => {
    // if (req.query) {
    //     results = filterByQuery(req.query, results);
    // }
    res.json(notes);
});

//finds specific data in the file
app.get('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    const data = filterByQuery({id:noteId}, notes);

    if (data.length === 0) {
        return res.status(404).json({error: "This isnt the data you're looking for."});
    }
    res.json(data);
});
app.get('/api/notes/name/:name', (req, res) => {
    const noteName = req.params.name;
    const data = filterByQuery({name:noteName}, notes);

    if (data.length === 0) {
        return res.status(404).json({error: "This isnt the data you're looking for."});
    }
    res.json(data);
});
app.get('/api/notes/date/:date', (req, res) => {
    const noteDate = req.params.date;
    const data = filterByQuery({date:noteDate}, notes);

    if (data.length === 0) {
        return res.status(404).json({error: "This isnt the data you're looking for."});
    }
    res.json(data);
});


//creates data in a file
app.post('/api/notes', (req, res) => {
    const id = uuidv4()
    const userNote = req.body
    userNote.id = id;
    //TODO: add request body as well as the id to the file
    //TODO: return created data. RES.JSON
    const note = createNewNote(userNote, notes)
    res.json(note)
    
});


// edits data in a file
app.put('/api/notes', (req, res) => {
    res.json({message:'edit note'})
});


// deletes data from the file
app.delete('/api/notes', (req, res) => {
    res.json({message:'delete A NOTE'})
})


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`)
});