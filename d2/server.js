const app = require("./src/app");



const notes = [];

app.get('/', (req, res) => {
    res.status(200).json({
        message: "ALL notes",
        notes
    })
})



app.post('/notes', (req, res) => {
    notes.push(req.body);
    res.status(200).json({
        message: "Notes Created",
        notes
    })
})

//! UPDATE

app.patch('/notes/:id', (req, res) => {
    const index = req.params.id;

    const {title} = req.body;

    notes[index].title  = title

     res.status(200).json({
        message: "Notes Updated"
    })


})





// ! DELETE 
app.delete('/notes/:id', (req, res) => {
    const index = req.params.id;
    delete notes[index];

    res.status(400).json({
        message: "Notes Deleted"
    })
})

app.listen(3000, () => {
    console.log(`Server is Running on Port 3000......`);
})