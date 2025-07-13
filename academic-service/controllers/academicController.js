const AcademicRecord = require("../models/AcademicRecord");
const { calculateGPA } = require("../utils/gpaCalculator");

exports.getStudentRecords = async (req, res) => {
  try {
    const records = await AcademicRecord.find({ studentId: req.user.id });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.createAcademicRecord = async (req, res) => {
  try {
    const record = new AcademicRecord({ ...req.body, studentId: req.user.id });
    await record.save();
    res.status(201).json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTranscript = async (req, res) => {
  try {
    const records = await AcademicRecord.find({ studentId: req.user.id });
    // Format into transcript style or generate PDF later
    res.json({ transcript: records });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getGPA = async (req, res) => {
  try {
    console.log("🧾 Student ID from token:", req.user.id); 

    const records = await AcademicRecord.find({ studentId: req.user.id });
    let allCourses = records.flatMap(r => r.courses);
    const gpa = calculateGPA(allCourses);

    res.json({ studentId: req.user.id, gpa });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


