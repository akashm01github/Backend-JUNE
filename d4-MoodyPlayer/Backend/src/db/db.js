const mongoose = require('mongoose');


const connectDB = ()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log(`Connected With DataBase......`);
    })
}



module.exports = connectDB;


