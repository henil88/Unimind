require("dotenv").config();
const app = require("./src/app");
const connectDb = require("./src/db/db");
const { createServer } = require("http");
const initialSocketServer = require("./src/socket/socket.server");
const httpServer = createServer(app);
initialSocketServer(httpServer);
const port = 3000;
connectDb();
httpServer.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
