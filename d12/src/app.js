const cookieParser = require("cookie-parser");
const express = require("express");
const authRoutes = require("./routes/auth.route");
const chatRoutes = require("./routes/chat.route");


const app = express();

//! MIDDLEWARES 
app.use(express.json());
app.use(cookieParser());


//! ROUTES
app.use('/api/auth/',authRoutes); 

app.use('/api/chat/',chatRoutes);

module.exports = app;