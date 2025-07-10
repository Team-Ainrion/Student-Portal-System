const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  userId: String,
  title: String,
  message: String,
  type: String, // e.g., "announcement", "reminder", "message"
  isRead: {
    type: Boolean,
    default: false
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Notification", notificationSchema);
