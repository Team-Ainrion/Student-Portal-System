const mongoose = require("mongoose");

// Define the schema for announcements
const AnnouncementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  targetGroup: {
    type: String,
    required: true,
    enum: ["students", "faculty", "all"], // you can add more roles
    lowercase: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create and export the model
module.exports = mongoose.model("Announcement", AnnouncementSchema);
