const Attendance = require("../models/Attendance");

exports.markAttendance = async (req, res) => {
  try {
    const record = new Attendance(req.body);
    await record.save();
    res.status(201).json({ message: "Attendance recorded", record });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAttendanceByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const records = await Attendance.find({ studentId });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAttendanceByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const records = await Attendance.find({ courseId });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message});
}
};