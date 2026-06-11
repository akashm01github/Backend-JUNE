const express = require('express');
const songRoutes = require('./routes/song.route');

const app = express();

var cors = require('cors')

app.use(express.json())

app.use(cors())


app.use('/',songRoutes);




module.exports  = app;
