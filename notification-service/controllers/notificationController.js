const Notification = require("../models/notification");
<<<<<<< HEAD
const sendNotification = require("../utils/sendNotification");

exports.createNotification = async (req, res) => {
  try {
    const { userId, title, message, channels } = req.body;

    // Save notification history
    const notif = new Notification({ userId, title, message, channels });
    await notif.save();

    // Send actual notification via channels
    await sendNotification(userId, title, message, channels);

    res.status(201).json({ message: "Notification sent and saved." });
  } catch (err) {
    res.status(500).json({ error: "Failed to send notification." });
  }
};

exports.getUserNotifications = async (req, res) => {
  try {
    const userId = req.params.userId;
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
=======

// Create a new notification
exports.createNotification = async (req, res) => {
  try {
    const newNotification = new Notification(req.body);
    const saved = await newNotification.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: "Failed to create notification." });
  }
};

// Get all notifications (or by user)
exports.getNotifications = async (req, res) => {
  try {
    const filter = req.params.userId ? { userId: req.params.userId } : {};
    const notifications = await Notification.find(filter).sort({ timestamp: -1 });
    res.json(notifications);
  } catch (error) {
>>>>>>> 44b78a3b0c5191458a605dc3d786734611ff4c51
    res.status(500).json({ error: "Failed to fetch notifications." });
  }
};

<<<<<<< HEAD
exports.markNotificationAsRead = async (req, res) => {
  try {
    const notificationId = req.params.id;

    const updated = await Notification.findByIdAndUpdate(
      notificationId,
      { read: true },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Notification not found." });
    }

    res.json({ message: "Notification marked as read.", notification: updated });
  } catch (err) {
    res.status(500).json({ error: "Failed to mark notification as read." });
  }
};
exports.markAllNotificationsAsRead = async (req, res) => {
  try {
    const userId = req.params.userId;

    const updated = await Notification.updateMany(
      { userId, read: false },
      { read: true }
    );

    res.json({ message: `Marked ${updated.modifiedCount} notifications as read.` });
  } catch (err) {
    res.status(500).json({ error: "Failed to mark all notifications as read." });
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    const notificationId = req.params.id;

    const deleted = await Notification.findByIdAndDelete(notificationId);

    if (!deleted) {
      return res.status(404).json({ error: "Notification not found." });
    }

    res.json({ message: "Notification deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete notification." });
=======
// Mark as read
exports.markAsRead = async (req, res) => {
  try {
    const updated = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Notification not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update notification." });
>>>>>>> 44b78a3b0c5191458a605dc3d786734611ff4c51
  }
};
