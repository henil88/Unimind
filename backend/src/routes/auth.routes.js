const express = require("express");
const router = express.Router();
const authController = require("../controller/auth.controller");
const { googleLink } = require("../../utils/googleAuth");

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/googleLink", googleLink);
router.get("/loginOauth2", authController.oAuth2Login);

module.exports = router;
