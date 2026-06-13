const express = require('express');
const indexRoute = require('./routes/index.route');


const app  = express();


// app.use((req,res,next)=>{
//     console.log(`This is Middleware between App and Route`);
//     next()
// })

app.use('/',indexRoute);




module.exports = app;


