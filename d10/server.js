const app = require("./src/app");

const { createServer } = require("http");

const { Server } = require("socket.io");
const generateResponse = require("./src/services/ai.service");

const httpServer = createServer(app);

const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
  console.log('A User Connected.....')

  socket.on("disconnect", () => {
    console.log('A user Disconnected')
  });


  socket.on("ai-message", async (data) => {
    console.log("Message Recieved", data)

    const resposne = await generateResponse(data.prompt);

    console.log(resposne);

    socket.emit("ai-message-response",{resposne})

  })
});






httpServer.listen(3000, () => {
  console.log('Server is Running on Port 3000........');
})

