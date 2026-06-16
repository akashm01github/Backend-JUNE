require("dotenv").config();
const express = require('express');
const authRoute = require("./routes/auth.routes");
const cookieParser = require("cookie-parser");
const postRoute = require("./routes/post.routes");

const app = express();

//! MIDDLEWARE
app.use(express.json());

app.use(cookieParser());

//! ROUTES
app.use('/api/auth/',authRoute);


app.use('/api/posts/',postRoute)


module.exports = app;

