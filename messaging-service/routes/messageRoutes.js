const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { sendMessage, getMessages } = require("../controllers/messageController");

// POST with file upload support (max 5 files)
router.post("/", upload.array("attachments", 5), sendMessage);

// GET messages
router.get("/:userId", getMessages);

module.exports = router;
