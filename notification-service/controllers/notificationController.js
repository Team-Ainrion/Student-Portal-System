const Notification = require("../models/notification");
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
    res.status(500).json({ error: "Failed to fetch notifications." });
  }
};

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
  }
};
