const chatModel = require("../models/chat.model");
const { chatTitleGenerator } = require("../service/ai.service");

async function creteChatTitle(req, res) {
  const firstMsg = req.body.msg;
  const user = req.user;
  let title = await chatTitleGenerator(firstMsg);

  if (!firstMsg || firstMsg.trim() === "") {
    return res.status(400).json({ message: "firstMsg is required" });
  }

  const chat = await chatModel.create({
    user: user._id,
    title,
  });
  // console.log(chat);
  return res.json({
    message: "title ganrated",
    title,
    chatId: chat._id,
    user: user._id,
  });
}

module.exports = { creteChatTitle };
