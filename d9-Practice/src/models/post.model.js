const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    caption: String,
    image: String,
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
});

const postModel = mongoose.model("post",postSchema);

module.exports = postModel;

