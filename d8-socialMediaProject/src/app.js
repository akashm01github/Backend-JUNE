require('dotenv').config();
const express = require('express');
const authRoute = require('./routes/auth.route');
const cookieParser = require('cookie-parser');
const postRoute = require('./routes/post.route');
const app = express();

app.use(express.json());

app.use(cookieParser());


app.use('/api/auth',authRoute);
app.use('/api/post',postRoute);


module.exports = app;


