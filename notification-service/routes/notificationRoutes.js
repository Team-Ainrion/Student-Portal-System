const express = require("express");
const router = express.Router();
<<<<<<< HEAD
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
=======

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
>>>>>>> 44b78a3b0c5191458a605dc3d786734611ff4c51

module.exports = router;
