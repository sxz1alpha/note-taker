const fs = require('fs');
const path = require('path');
const express = require('express');
const { v4: uuidv4 } = require('uuid');
let notes  = require(`./Develop/db/db.json`);

//instantiates the server 
const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('Develop/public'))


function createNewNote(body, notes) {
    const note = body
    notes.push(note)
    console.log(notes)
    fs.writeFileSync(
        path.join(__dirname, './Develop/db/db.json'),
        // './Develop/db/db.json',
        JSON.stringify(notes, null, 2)
    );
    return note;
};

app.get('/api/notes', (req, res) => {
    res.json(notes);
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'))
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'))
});

//creates data in a file
app.post('/api/notes', (req, res) => {
    
    //creates a unique id for newly posted notes.
    const id = uuidv4()
    const userNote = req.body
    userNote.id = id;
    //writes new notes to thje db.json file
    const note = createNewNote(userNote, notes)
    res.json(note)
    
});

// deletes data from the file
app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    const note = notes.find(element => element.id === id); 
    if(!note) { 
            return res.status(404).json({error: 'No note found.', success: false})
    }
        
    //finds the element with the matching id and removes it from the updatedData
    notes = notes.filter(element => element.id !== id)

    fs.writeFile(
        path.join(__dirname, './Develop/db/db.json'),
        // './Develop/db/db.json',
        JSON.stringify(notes, null, 2),
        (err) => {
            if(err) throw err;  
            res.status(200).json(notes);
        }
        
    );
})
        
        
app.listen(3003, () => {
    console.log(`API server now on port ${3003}`)
});

// Notes for alternate routes and functionality.
//=============================================================================================================


// function filterByQuery(query, notesArray) {
    
//     let filteredResults = notesArray.notes;
    
//     if (query.date) {
//         filteredResults = filteredResults.filter(notes => notes.date === query.date);
//     }
//     if (query.name) {
//         filteredResults = filteredResults.filter(notes => notes.name === query.name);
//     }
//     if (query.id) {
//         filteredResults = filteredResults.filter(notes => notes.id === query.id);
//     }
//     return filteredResults;
// };

// edits data in a file
// app.put('/api/notes', (req, res) => {
    //     const id = req.body.id
    //     //finds the element in the notes id thats id is = to the element id
    //     const note = notes.find(element => element.id === id);
    
    //     if(!note) {
        //         return res.status(404).json({error: 'Note not found.'})
        //     }
        
        //     const { title, text } = req.body;
        //     const updatedNote = {...note}
        //     if(title) {
        //         updatedNote.title = title;
        //     }
        //     if(text) {
            //         updatedNote.text = text;
            //     }
            
            //     let updatedData = [...notes]
            //     updatedData = updatedData.filter(element => element.id !== id)
            
            //     updatedData = [...updatedData, updatedNote]
            
            //     fs.writeFileSync(
                //         path.join(__dirname, './Develop/db/db.json'),
                //         JSON.stringify(updatedData, null, 2)
                //     );
                
                //     res.json(updatedNote)
                // });
                //finds specific data in the file
                // app.get('/api/notes/:id', (req, res) => {
                //     const noteId = req.params.id;
                //     const data = filterByQuery({id:noteId}, notes);
                
                //     if (data.length === 0) {
                //         return res.status(404).json({error: "This isnt the data you're looking for."});
                //     }
                //     res.json(data);
                // });
                
                // app.get('/api/notes/name/:name', (req, res) => {
                //     const noteName = req.params.name;
                //     const data = filterByQuery({name:noteName}, notes);
                
                //     if (data.length === 0) {
                //         return res.status(404).json({error: "This isnt the data you're looking for."});
                //     }
                //     res.json(data);
                // });
                // app.get('/api/notes/date/:date', (req, res) => {
                //     const noteDate = req.params.date;
                //     const data = filterByQuery({date:noteDate}, notes);
                
                //     if (data.length === 0) {
                //         return res.status(404).json({error: "This isnt the data you're looking for."});
                //     }
                //     res.json(data);
                // });