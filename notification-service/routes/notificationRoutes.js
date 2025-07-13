const express = require("express");
const router = express.Router();
const { 
  createNotification, 
  getUserNotifications, 
  markNotificationAsRead, 
  markAllNotificationsAsRead,
  deleteNotification 
} = require("../controllers/notificationController");
const applyUserPreferences = require("../middleware/preferencesMiddleware");

// Create notification
router.post("/", applyUserPreferences, createNotification);

// Get all notifications for a user
router.get("/:userId", getUserNotifications);

// Mark a single notification as read
router.put("/mark-read/:id", markNotificationAsRead);

// Mark all notifications as read for a user
router.put("/mark-all-read/:userId", markAllNotificationsAsRead);

// Delete a notification
router.delete("/:id", deleteNotification);

module.exports = router;
