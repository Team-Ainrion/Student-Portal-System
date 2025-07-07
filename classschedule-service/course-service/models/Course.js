// models/Course.js
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  faculty: { type: String },
  creditHours: { type: Number, required: true, min: 1, max: 6 },
  prerequisites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  capacity: { type: Number, required: true },
  studentsEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  waitlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  registrationStart: { type: Date, required: true },
  registrationEnd: { type: Date, required: true },
  dropDeadline: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Course", courseSchema);
