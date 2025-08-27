const userModel = require("../models/user.model");
const { chatTitleGenerator } = require("../service/ai.service");

async function creteChatTitle(req, res) {
  const firstMsg = req.body.msg;
  const userId = req.body.user;
  let title = await chatTitleGenerator(firstMsg);

  const isUser = await userModel.findOne({ _id: userId });

  if (!isUser) {
    return res.json({
      message: "user id invalid ",
    });
  }
  if (!firstMsg || firstMsg.trim() === "") {
    return res.status(400).json({ message: "firstMsg is required" });
  }
  return res.json({
    message: "title ganrated",
    title,
  });
}

module.exports = { creteChatTitle };
