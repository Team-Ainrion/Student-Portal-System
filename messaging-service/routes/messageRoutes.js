const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { sendMessage, getMessages } = require("../controllers/messageController");

<<<<<<< HEAD
// POST: send message
router.post("/", upload.array("attachments", 5), sendMessage);

// GET: messages by user
=======
// POST with file upload support (max 5 files)
router.post("/", upload.array("attachments", 5), sendMessage);

// GET messages
>>>>>>> 44b78a3b0c5191458a605dc3d786734611ff4c51
router.get("/:userId", getMessages);

module.exports = router;
