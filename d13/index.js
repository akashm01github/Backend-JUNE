const path = require("path");

const http = require("http");
const express = require("express");
const app = express();

const httpServer = http.createServer(app);

app.use(express.static(path.resolve('./public')));

//! SOCKET.IO REQUIRE
const {Server} = require("socket.io"); 

const io = new Server(httpServer);

io.on("connection",(socket)=>{
    socket.on("user-message",(message)=>{
        io.emit("message",message);
    })
})


app.get('/',(req,res)=>{
    return res.sendFile('/public/index.html')
})

httpServer.listen(9000,()=>{
    console.log(`Server Started at PORT:9000`);
})