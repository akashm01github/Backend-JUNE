const mongoose = require('mongoose');


const connectDB = ()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log(`DataBase is Connected.......`);
    })
}


module.exports = connectDB;


