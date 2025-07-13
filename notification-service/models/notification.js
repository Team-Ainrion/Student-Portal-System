const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  userId: String,              // who receives it
  title: String,
  message: String,
  channels: [String],          // ['in-app', 'email']
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Notification", notificationSchema);
