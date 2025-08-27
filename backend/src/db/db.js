const mongoose = require("mongoose");

async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("db has been connected");
  } catch (error) {
    console.log("we got some error to connect db");
  }
}

module.exports = connectDb;
