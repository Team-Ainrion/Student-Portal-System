const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { sendMessage, getMessages } = require("../controllers/messageController");

// POST: send message
router.post("/", upload.array("attachments", 5), sendMessage);

// GET: messages by user
router.get("/:userId", getMessages);

module.exports = router;
