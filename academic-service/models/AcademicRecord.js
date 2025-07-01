const mongoose = require("mongoose");

const academicRecordSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  semester: { type: String, required: true },
  courses: [
    {
      code: String,
      name: String,
      grade: String,
      credits: Number,
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model("AcademicRecord", academicRecordSchema);
