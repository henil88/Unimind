const express = require("express");
const multer = require("multer");
const router = express.Router();
const { handleUpload } = require("../controller/msg.controller");
const upload = multer({ dest: "uploads/" });
const { authUser } = require("../middleware/auth.middlware");

router.post("/", authUser, upload.single("file"), handleUpload);


module.exports = router;
