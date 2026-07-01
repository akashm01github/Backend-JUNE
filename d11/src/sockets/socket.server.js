const { Server } = require("socket.io");

const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const { generateResponse, generateVectors } = require("../services/ai.service");
const messageModel = require("../models/message.model");
const { createMemory } = require("../services/vector.service");


function initSocketServer(httpServer) {
    const io = new Server(httpServer, {});


    //! SOCKET MIDDLEWARE 
    io.use(async (socket, next) => {
        const cookies = cookie.parseCookie(socket.handshake.headers.cookie);

        if (!cookies.token) {
            next(new Error("Authentication Faild: No Token Provided"));
        }

        try {
            const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET_KEY);

            const user = await userModel.findById(decoded.id);

            socket.user = user;

            next();


        } catch (error) {
            next(new Error("Authentication Faild: ", error));
        }
    })



    io.on("connection", (socket) => {
        console.log("New Socket Connection: ", socket.id);


        socket.on("ai-message", async (messagePaylaod) => {

            await messageModel.create({
                content: messagePaylaod.content,
                chat: messagePaylaod.chat,
                user: socket.user.id,
                role: "user"
            })


            const vectors = await generateVectors(messagePaylaod.content);


            console.log(vectors)


            await createMemory({
                vectors:vectors,
                messageId:"57145s2",
                metadata:{
                    chat:messagePaylaod.chat,
                    user:socket.user.id
                }
            })


            const chatHistory = await messageModel.find({
                chat: messagePaylaod.chat
            })



            const result = await generateResponse(chatHistory.map((item) => {
                return {
                    role: item.role,
                    parts: [{ text: item.content }]
                }
            }));



            await messageModel.create({
                content: result,
                chat: messagePaylaod.chat,
                user: socket.user.id,
                role: "model"
            })


            socket.emit("ai_response", {
                content: result
            })

        })

    });
}

module.exports = initSocketServer;


