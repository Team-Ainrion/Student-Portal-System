

const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true 
  },
  courseCode: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  faculty: {
    type: String,
    required: true,
    index: true
  },
  day: {
    type: String,
    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    required: true
  },
  timeSlot: {
    type: String,
    required: true 
  },
  room: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Schedule", ScheduleSchema);
