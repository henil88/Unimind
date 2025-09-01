const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
    title: {
      type: String,
      default: "New Chat",
    },
    lastActivity: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const chatModel = mongoose.model("chat", chatSchema);

module.exports = chatModel;
