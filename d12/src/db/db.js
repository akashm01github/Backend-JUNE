const mongoose = require("mongoose");

const connectDB = async()=>{
    try {

        await mongoose.connect(process.env.MONGODB_URL)
        
        console.log("MongoDB is Connected.......");

    } catch (error) {
        throw error;
    }
}


module.exports = connectDB;

