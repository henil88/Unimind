const express = require("express");
const router = express.Router();
const chatController = require("../controller/chat.controller");

router.post("/", chatController.creteChatTitle);
module.exports = router;
