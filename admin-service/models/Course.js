const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  courseCode: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  assignedFaculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty",
    default: null,
  }
}, { timestamps: true });

module.exports = mongoose.model("Course", CourseSchema);
