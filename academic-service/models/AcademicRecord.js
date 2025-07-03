const mongoose = require("mongoose");



const courseSchema = new mongoose.Schema({
  courseId: String,
  courseName: String,
  creditHours: Number,
  grade: String
});

const academicRecordSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  program: String,
  semester: String,
  courses: [courseSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("AcademicRecord", academicRecordSchema);
