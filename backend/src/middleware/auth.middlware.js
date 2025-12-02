const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

async function authUser(req, res, next) {
  const { token } = req.cookies;
  console.log(req.cookies);
  if (!token) {
    return res.status(401).json({
      message: "unauthorized login first",
    });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({ id: decode._id });
    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = { authUser };
