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
    content: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      enum: ["user", "model"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

const msgModel = mongoose.model("msg", msgSchema);

module.exports = msgModel;
