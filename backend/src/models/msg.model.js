const mongoose = require("mongoose");

const msgSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chat",
    },
    type: {
      type: String,
      enum: ["text", "audio", "file"],
      required: true,
    },
    content: {
      type: String, // usually text
    },
    fileUrl: String, // for files
    audioUrl: String, // for audio
    role: {
      type: String,
      enum: ["user", "model"],
      default: "user",
    },
  },
  { timestamps: true }
);

const msgModel = mongoose.model("msg", msgSchema);

module.exports = msgModel;
