const mongoose = require("mongoose");

const gradeSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  grades: [
    {
      component: String,
      score: Number,
      weight: Number
    }
  ],
  finalGrade: Number,
  submitted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Grade",gradeSchema);