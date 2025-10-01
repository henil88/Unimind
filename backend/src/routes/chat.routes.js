const express = require("express");
const router = express.Router();
const chatController = require("../controller/chat.controller");
const { authUser } = require("../middleware/auth.middlware");

router.post("/", authUser, chatController.creteChatTitle);

module.exports = router;
