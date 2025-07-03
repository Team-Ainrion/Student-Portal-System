const mongoose = require("mongoose");

// This defines the structure for storing schedules
const ScheduleSchema = new mongoose.Schema({
  studentId: String,
  day: String,
  periods: [
    {
      time: String,     // e.g., "9:00 AM - 10:00 AM"
      subject: String,  // e.g., "Math"
      faculty: String   // e.g., "Dr. Sharma"
    }
  ]
});

module.exports = mongoose.model("Schedule", ScheduleSchema);
