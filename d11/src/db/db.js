const mongoose  = require("mongoose");


const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)

        console.log("MONGODB is Connected............")
    } catch (error) {
        console.log("The Error: ",error)
    }
}


module.exports = connectDB;




