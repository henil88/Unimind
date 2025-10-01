const { Server } = require("socket.io");
const aiResponse = require("../service/ai.service");

function initialSocketServer(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", async (socket) => {
    console.log("connected---", socket.id);

    // --- TEXT CHAT ---
    socket.on("msg", async (msg) => {
      console.log("user-text:", msg);
      const aiRes = await aiResponse.chatTextResponse(msg);
      socket.emit("ai-res", aiRes);
      console.log(aiRes);
    });
    socket.on("disconnect", () => {
      console.log("disconnected---", socket.id);
    });
  });
}

module.exports = initialSocketServer;
