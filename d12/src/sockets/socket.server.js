const cookie = require('cookie');
const jwt = require('jsonwebtoken');
const { Server } = require("socket.io");
const userModel = require('../models/user.model');
const geneRateResponse = require('../services/ai.service');
const messageModel = require('../models/message.model');




function initSocketServer(httpServer){
    const io = new Server(httpServer,{});


    io.use(async(socket,next)=>{
        const cookies = cookie.parseCookie(socket.handshake.headers.cookie)

        if(!cookies.token){
            next(new Error("Autherntication error: NO token Provided"));
        }

        try {
            const decode = jwt.verify(cookies.token, process.env.JWT_SECRET_KEY);

            const user = await userModel.findById(decode.id);

            socket.user = user;

            next();

        } catch (error) {
            next(new Error("Authentication Error: Invalid Token"));
        }
    })

    io.on("connection",(socket)=>{

        socket.on("ai-message",async(messagePayload)=>{
            console.log(messagePayload);


            const chatHistory = await messageModel.find({chat:messagePayload.chat});

            console.log(chatHistory);


            await messageModel.create({
                chat:messagePayload.chat,
                user:socket.user.id,
                content:messagePayload.content,
                role:"user"
            })

            const response =await geneRateResponse(messagePayload.content);


            await messageModel.create({
                chat:messagePayload.chat,
                user:socket.user.id,
                content:response,
                role:"model"
            })
            socket.emit("ai-response",{
                content:response,
                chat:messagePayload.chat
            })
        })
        console.log("New Socket Connection", socket.id);
    })
}


module.exports = initSocketServer;

