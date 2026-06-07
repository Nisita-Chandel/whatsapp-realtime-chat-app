const express = require("express");
const { sendMessage } = require("../controllers/messageController");

const router = express.Router();

// Send Message
router.post("/send", sendMessage);

module.exports = router;