const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const oAuth2 = require("../../utils/googleAuth");
const { google } = require("googleapis");

async function registerUser(req, res) {
  const {
    email,
    fullName: { firstName, secondName },
    password,
  } = req.body;

  const isEmailExist = await userModel.findOne({ email });
  if (isEmailExist) {
    return res.status(400).json({
      message: "email alredy exist",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await userModel.create({
    email,
    fullName: {
      firstName,
      secondName,
    },
    password: hashPassword,
  });

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
  res.cookie("token", token);

  res.status(201).json({
    message: "user register success",
    newUser,
  });
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  const isUserExist = await userModel.findOne({ email });
  if (!isUserExist) {
    return res.status(401).json({
      message: "User email not found",
    });
  }

  const isPassword = await bcrypt.compare(password, isUserExist.password);

  if (!isPassword) {
    return res.status(401).json({
      message: "invalid email or password",
    });
  }

  const token = jwt.sign({ id: isUserExist._id }, process.env.JWT_SECRET);
  res.cookie("token", token);

  res.status(200).json({
    message: "user login success",
    user: {
      email: isUserExist.email,
      fullName: isUserExist.fullName,
      id: isUserExist._id,
    },
  });
}

async function oAuth2Login(req, res) {
  const code = req.query.code || req.body.code;
  try {
    const { tokens } = await oAuth2.getToken(code);
    oAuth2.setCredentials(tokens);

    const userDetails = google.oauth2({ version: "v2", auth: oAuth2 });
    const userRes = await userDetails.userinfo.get();
    const { email, name } = userRes.data;

    let [firstName, ...rest] = name ? name.split(" ") : ["", ""];
    let secondName = rest.join(" ") || "";

    let isUserExist = await userModel.findOne({ email });
    if (!isUserExist) {
      isUserExist = await userModel.create({
        email,
        fullName: {
          firstName,
          secondName,
        },
      });
    }

    const token = jwt.sign({ id: isUserExist._id }, process.env.JWT_SECRET);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    // redirect back to React home
    res.redirect(process.env.FRONTEND_URL);
  } catch (error) {
    console.log("auth login error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
module.exports = { registerUser, loginUser, oAuth2Login };
