const app = require("./src/app");


const notes = [];

// GET REQUEST 
app.get('/notes', (req, res) => {
    res.status(200).json({
        message: "Notes Fetched",
        notes
    })
})


//! CREATE 
app.post('/notes', (req, res) => {

    notes.push(req.body)

    res.status(200).json({
        message: "Notes Created",
        notes
    })
})


//! UPDATE 
app.patch('/notes/:id', (req, res) => {

    const idx = req.params.id;

    const {title} = req.body;

    notes[idx].title = title

    res.status(200).json({
        message: "Notes Updated",
        notes
    })
})


//! DELETE 
app.delete('/notes/:id', (req, res) => {

    const idx = req.params.id;

    delete notes[idx];

    res.status(200).json({
        message: "Notes Deleted"
    })
})




app.listen(3000, () => {
    console.log(`Server is Running on Port 3000.....`)
})