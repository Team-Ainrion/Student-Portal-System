const AcademicRecord = require("../models/AcademicRecord");

exports.addRecord = async (req, res) => {
  try {
    const record = new AcademicRecord(req.body);
    await record.save();
    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ error: "Failed to add record", details: err });
  }
};

exports.getRecordsByStudent = async (req, res) => {
  try {
    const records = await AcademicRecord.find({ studentId: req.params.studentId });
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ error: "Error fetching records", details: err });
  }
};
