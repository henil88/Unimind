console.log("init");
require("dotenv").config();
const buildApp = require("./src/app");
const connectDb = require("./src/db/db");
const { createServer } = require("http");
const initialSocketServer = require("./src/socket/socket.server");
const app = buildApp();
const httpServer = createServer(app);
initialSocketServer(httpServer);
const port = process.env.PORT || 3000;
connectDb();
httpServer.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
