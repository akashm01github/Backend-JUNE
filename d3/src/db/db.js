const mongoose = require('mongoose');

function connectDB(){
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log(`DB is Connected.......`);
    })
}


module.exports  = connectDB;

