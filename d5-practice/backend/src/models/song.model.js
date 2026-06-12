const mongoose = require('mongoose');


const songSchema = new mongoose.Schema({
    title:String,
    artist:String,
    mood:String,
    audio:String
});


const songModel = mongoose.model("songs",songSchema);


module.exports = songModel;


