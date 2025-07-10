const Notification = require("../models/notification");

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
    res.status(500).json({ error: "Failed to fetch notifications." });
  }
};

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
  }
};
