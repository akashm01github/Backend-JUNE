require('dotenv').config()
const app = require("./src/app");
const connectDB = require('./src/db/db');



connectDB();



app.get('/home',(req,res)=>{
    res.status(200).json({
        message:"This is Home Page"
    })
})

app.listen(3000,()=>{
    console.log(`Server is Running on Port 3000.........`);
})