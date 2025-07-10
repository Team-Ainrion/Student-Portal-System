const express = require("express");
const router = express.Router();

const {
  createNotification,
  getNotifications,
  markAsRead
} = require("../controllers/notificationController");

// POST /api/notifications - Create a new notification
router.post("/", createNotification);

// GET /api/notifications/:userId? - Get all or by user
router.get("/:userId?", getNotifications);

// PUT /api/notifications/read/:id - Mark notification as read
router.put("/read/:id", markAsRead);

module.exports = router;
