const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
<<<<<<< HEAD
  userId: String,              // who receives it
  title: String,
  message: String,
  channels: [String],          // ['in-app', 'email']
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
=======
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
>>>>>>> 44b78a3b0c5191458a605dc3d786734611ff4c51
});

module.exports = mongoose.model("Notification", notificationSchema);
