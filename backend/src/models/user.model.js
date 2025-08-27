const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
    },
    fullName: {
      firstName: {
        type: String,
        require: true,
      },
      secondName: {
        type: String,
        require: true,
      },
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
