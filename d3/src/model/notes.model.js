const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    title:String,
    desc:String
});


const notesModel = mongoose.model('notes',notesSchema);

module.exports = notesModel;

