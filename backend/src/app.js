const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const authRoute = require("./routes/auth.routes");
const chatRoute = require("./routes/chat.routes");
const uploadRoute = require("./routes/msg.routes");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use("/api/auth", authRoute);
app.use("/api/chat", chatRoute);
app.use("/api/msg", uploadRoute);
module.exports = app;
