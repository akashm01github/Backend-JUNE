const app = require("./src/app");
const connectDB = require("./src/db/db");
const notesModel = require("./src/model/notes.model");


connectDB();

// const notes = [];

// GET REQUEST 
app.get('/notes', async (req, res) => {
    const notes = await notesModel.find();

    res.status(200).json({
        message: "Notes Fetched",
        notes
    })
})


//! CREATE 
app.post('/notes', async (req, res) => {
    const { title, desc } = req.body;

    await notesModel.create({
        title,
        desc
    })


    res.status(200).json({
        message: "Notes Created"
    })
})


//! UPDATE 
app.patch('/notes/:id', async(req, res) => {

    const idx = req.params.id;

    const { title } = req.body;

    await notesModel.findByIdAndUpdate(
        { _id: idx }, { title: title }
    )

    res.status(200).json({
        message: "Notes Updated"
    })
})


//! DELETE 
app.delete('/notes/:id', async(req, res) => {

    const idx = req.params.id;

    await notesModel.findByIdAndDelete({
        _id:idx
    })
    

    res.status(200).json({
        message: "Notes Deleted"
    })
})




app.listen(3000, () => {
    console.log(`Server is Running on Port 3000.....`)
})