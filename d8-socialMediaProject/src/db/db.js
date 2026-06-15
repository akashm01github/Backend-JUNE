const mongoose = require('mongoose');

const connectDB = async()=>{
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log(`DataBase is Connected.........`)
    })
}


module.exports = connectDB;

