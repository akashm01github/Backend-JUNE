const app = require("./src/app");

const { createServer } = require("http");

const { Server } = require("socket.io");
const generateResponse = require("./src/services/ai.service");

const httpServer = createServer(app);

const io = new Server(httpServer, { /* options */ });


const chatHistory = []

io.on("connection", (socket) => {
  console.log('A User Connected.....')

  socket.on("disconnect", () => {
    console.log('A user Disconnected')
  });


  socket.on("ai-message", async (data) => {

    chatHistory.push({
      role: "user",
      parts: [{ text: data.prompt }]
    })

    const resposne = await generateResponse(chatHistory);

    socket.emit("ai-message-response", { resposne })

    
    chatHistory.push({
      role: "model",
      parts: [{ text: resposne }]
    })

  })
});






httpServer.listen(3000, () => {
  console.log('Server is Running on Port 3000........');
})

