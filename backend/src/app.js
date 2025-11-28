const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");

const buildApp = () => {
  const app = express();
  app.use(express.json());
  app.use(cookieParser());
  app.use(
    cors({
      origin: process.env.FRONTEND_URL,
      credentials: true,
    })
  );

  app.get("/", (req, res) => {
    res.send("connect");
  });
  app.use("/api/auth", (req, res, next) => {
    const authRoute = require("./routes/auth.routes");
    authRoute(req, res, next);
  });
  app.use("/api/chat", (req, res, next) => {
    const chatRoute = require("./routes/chat.routes");
    chatRoute(req, res, next);
  });
  app.use("/api/msg", (req, res, next) => {
    const uploadRoute = require("./routes/msg.routes");
    uploadRoute(req, res, next);
  });
  return app
};
module.exports = buildApp;
