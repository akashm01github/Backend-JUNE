const mongoose = require('mongoose');

const connectDB = ()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log(`MongoDB is Connected with Server.......`)
    })
}


module.exports = connectDB;