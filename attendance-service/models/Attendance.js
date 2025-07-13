const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ["Present", "Absent", "Late"], required: true },
  remarks: String
}, { timestamps: true });

module.exports = mongoose.model("Attendance", attendanceSchema);