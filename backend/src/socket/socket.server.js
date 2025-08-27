const { Server } = require("socket.io");
const chatTextResponse = require("../service/ai.service");

function initialSocketServer(httpServer) {
  const io = new Server(httpServer, {
    /* cros */
  });

  io.on("connection", (socket) => {
    console.log("connected---", socket.id);
    /* recive msg from frontend */
    socket.on("msg", async (msg) => {
      console.log(msg);
      const aiRes = await chatTextResponse(msg);
      /* send ai-res to frontend*/
      socket.emit("ai-res", aiRes);
      console.log(aiRes);
    });
    socket.on("disconnect", () => {
      console.log("disconnected---", socket.id);
    });
  });
}

module.exports = initialSocketServer;
